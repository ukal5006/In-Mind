import React, { useState, useEffect, useCallback } from 'react';
import { OpenVidu, Session, Publisher, Subscriber, StreamManager } from 'openvidu-browser';
import axios from 'axios';
import './App.css';
import UserVideoComponent from './UserVideoComponent';

const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? '' : 'https://b301.xyz/';

const createSession = async (sessionId: string) => {
  const response = await axios.post(APPLICATION_SERVER_URL + 'openvidu/api/sessions', { customSessionId: sessionId }, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data; // The sessionId
};

const createToken = async (sessionId: string) => {
  const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections', {}, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data; // The token
};

const getToken = async (sessionId: string): Promise<string> => {
  const sessionResponse = await createSession(sessionId);
  const token = await createToken(sessionResponse);
  return token;
};

const useOpenVidu = (getTokenFunc: (sessionId: string) => Promise<string>) => {
  const [session, setSession] = useState<Session | undefined>(undefined);
  const [mainStreamManager, setMainStreamManager] = useState<StreamManager | undefined>(undefined);
  const [publisher, setPublisher] = useState<Publisher | undefined>(undefined);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const OV = React.useRef<OpenVidu | null>(null);

  const initializeSession = useCallback(async (sessionId: string, userName: string) => {
    OV.current = new OpenVidu();
    const mySession = OV.current.initSession();

    setSession(mySession);

    mySession.on('streamCreated', (event) => {
      const subscriber = mySession.subscribe(event.stream, undefined);
      setSubscribers(prevSubscribers => [...prevSubscribers, subscriber]);
    });

    mySession.on('streamDestroyed', (event) => {
      setSubscribers(prevSubscribers => prevSubscribers.filter(sub => sub !== event.stream.streamManager));
    });

    mySession.on('exception', (exception) => {
      console.warn(exception);
    });

    try {
      const token = await getTokenFunc(sessionId);
      await mySession.connect(token, { clientData: userName });

      let publisher = await OV.current.initPublisherAsync(undefined, {
        audioSource: undefined,
        videoSource: undefined,
        publishAudio: true,
        publishVideo: true,
        resolution: '640x480',
        frameRate: 30,
        insertMode: 'APPEND',
        mirror: false,
      });

      mySession.publish(publisher);

      setMainStreamManager(publisher);
      setPublisher(publisher);
    } catch (error) {
      console.log('There was an error connecting to the session:', error);
    }
  }, [getTokenFunc]);

  const leaveSession = useCallback(() => {
    if (session) {
      session.disconnect();
    }

    OV.current = null;
    setSession(undefined);
    setSubscribers([]);
    setMainStreamManager(undefined);
    setPublisher(undefined);
  }, [session]);

  const switchCamera = useCallback(async () => {
    if (!OV.current || !session || !publisher) return;

    try {
      const devices = await OV.current.getDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');

      if (videoDevices && videoDevices.length > 1) {
        const newVideoDevice = videoDevices.find(device => device.deviceId !== publisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId);

        if (newVideoDevice) {
          const newPublisher = OV.current.initPublisher(undefined, {
            videoSource: newVideoDevice.deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true
          });

          await session.unpublish(mainStreamManager as Publisher);
          await session.publish(newPublisher);
          setMainStreamManager(newPublisher);
          setPublisher(newPublisher);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [session, mainStreamManager, publisher]);

  return {
    session,
    mainStreamManager,
    publisher,
    subscribers,
    initializeSession,
    leaveSession,
    switchCamera,
    setMainStreamManager
  };
};

const App = (): JSX.Element => {
  const [mySessionId, setMySessionId] = useState<string>('SessionA');
  const [myUserName, setMyUserName] = useState<string>(`Participant${Math.floor(Math.random() * 100)}`);
  const { 
    session, 
    mainStreamManager, 
    publisher, 
    subscribers, 
    initializeSession, 
    leaveSession, 
    switchCamera,
    setMainStreamManager 
  } = useOpenVidu(getToken);

  useEffect(() => {
    const onBeforeUnload = () => {
      leaveSession();
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  }, [leaveSession]);

  const handleChangeSessionId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMySessionId(e.target.value);
  };

  const handleChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMyUserName(e.target.value);
  };

  const handleMainVideoStream = (stream: StreamManager) => {
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream);
    }
  };

  const joinSession = () => {
    initializeSession(mySessionId, myUserName);
  };

  return (
    <div className="container">
      {session === undefined ? (
        <div id="join">
          <div id="join-dialog">
            <h1>Join a video session</h1>
            <form onSubmit={(e) => { e.preventDefault(); joinSession(); }}>
              <p>
                <label>Participant: </label>
                <input
                  type="text"
                  id="userName"
                  value={myUserName}
                  onChange={handleChangeUserName}
                  required
                />
              </p>
              <p>
                <label>Session: </label>
                <input
                  type="text"
                  id="sessionId"
                  value={mySessionId}
                  onChange={handleChangeSessionId}
                  required
                />
              </p>
              <p>
                <input type="submit" value="JOIN" />
              </p>
            </form>
          </div>
        </div>
      ) : null}

      {session !== undefined ? (
        <div id="session">
          <div id="session-header">
            <h1 id="session-title">{mySessionId}</h1>
            <input
              type="button"
              id="buttonLeaveSession"
              onClick={leaveSession}
              value="Leave session"
            />
            <input
              type="button"
              id="buttonSwitchCamera"
              onClick={switchCamera}
              value="Switch Camera"
            />
          </div>

          {mainStreamManager !== undefined ? (
            <div id="main-video" className="col-md-6">
              <UserVideoComponent streamManager={mainStreamManager} />
            </div>
          ) : null}
          <div id="video-container" className="col-md-6">
            {publisher !== undefined ? (
              <div className="stream-container col-md-6 col-xs-6" onClick={() => handleMainVideoStream(publisher)}>
                <UserVideoComponent streamManager={publisher} />
              </div>
            ) : null}
            {subscribers.map((sub, i) => (
              <div key={i} className="stream-container col-md-6 col-xs-6" onClick={() => handleMainVideoStream(sub)}>
                <UserVideoComponent streamManager={sub} />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default App;