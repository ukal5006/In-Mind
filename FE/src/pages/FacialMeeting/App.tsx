import React, { useState, useEffect, useCallback } from 'react';
import { OpenVidu, Session, Publisher, Subscriber, StreamManager } from 'openvidu-browser';
import axios from 'axios';
import './App.css';
import UserVideoComponent from './UserVideoComponent';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';
import { BsCameraVideo, BsCameraVideoOff } from 'react-icons/bs';
import { MdCallEnd } from 'react-icons/md';

const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? '' : 'https://i11b301.p.ssafy.io/';

const createSession = async (sessionId: string) => {
  try {
    const response = await axios.post(
      APPLICATION_SERVER_URL + 'openvidu/api/sessions', 
      { customSessionId: sessionId }, 
      {
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': 'Basic T1BFTlZJRFVBUFA6c3NhZnk='
        },
      }
    );
    return response.data.sessionId;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 409) {
      console.log('Session already exists. Reusing existing session.');
      return sessionId;
    }
    console.error('Error creating session:', error);
    throw error;
  }
};

const createToken = async (sessionId: string) => {
  const response = await axios.post(APPLICATION_SERVER_URL + 'openvidu/api/sessions/' + sessionId + '/connection', {}, {
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic T1BFTlZJRFVBUFA6c3NhZnk=' },
  });
  return response.data.token;
};

const getToken = async (sessionId: string): Promise<string> => {
  try {
    const session = await createSession(sessionId);
    const token = await createToken(session);
    return token;
  } catch (error) {
    console.error("Error getting token:", error);
    throw error;
  }
};

const useOpenVidu = (getTokenFunc: (sessionId: string) => Promise<string>) => {
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
  const [session, setSession] = useState<Session | undefined>(undefined);
  const [mainStreamManager, setMainStreamManager] = useState<StreamManager | undefined>(undefined);
  const [publisher, setPublisher] = useState<Publisher | undefined>(undefined);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const OV = React.useRef<OpenVidu | null>(null);

  const initializeSession = useCallback(async (sessionId: string, userName: string) => {
    OV.current = new OpenVidu();
    if (process.env.NODE_ENV === 'production') {
      OV.current.enableProdMode();
    }
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
      if (typeof token !== 'string') {
        throw new Error('Invalid token type');
      }
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

  const toggleAudio = useCallback(() => {
    if (publisher) {
      setIsAudioMuted(prevState => {
        const newAudioState = !prevState;
        publisher.publishAudio(!newAudioState);
        return newAudioState;
      });
    }
  }, [publisher]);

  const toggleVideo = useCallback(() => {
    if (publisher) {
      setIsVideoMuted(prevState => {
        const newVideoState = !prevState;
        publisher.publishVideo(!newVideoState);
        return newVideoState;
      });
    }
  }, [publisher]);

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
    setMainStreamManager,
    isAudioMuted,
    toggleAudio,
    isVideoMuted,
    toggleVideo,
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
    isAudioMuted,
    initializeSession, 
    leaveSession, 
    switchCamera,
    setMainStreamManager,
    toggleAudio,
    isVideoMuted,
    toggleVideo,
  } = useOpenVidu(getToken);
  useEffect(() => {
    console.log("Audio muted state:", isAudioMuted);
  }, [isAudioMuted]);

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
      ) : (
        <div id="session">
          <div className="main-video-container big-face">
            {subscribers.length > 0 && (
              <UserVideoComponent streamManager={subscribers[0]} />
            )}
          </div>
          <div className="sidebar">
            <div className="sidebar-video">
              {publisher && (
                <UserVideoComponent streamManager={publisher} />
              )}
            </div>
            <div className="sidebar-content">
              {/* <h2>채팅</h2> */}
              {/* 여기에 모달로 연결 혹은 그냥 보여주고 사진만 키우기? */}
              <button>검사 결과 보기</button>
            </div>
          </div>
          <div className="footer">
            {/* switch button 없앨듯 */}
            {/* <button onClick={switchCamera}>Switch Camera</button>  */}
            {/* 음소거버튼   반응형?*/}
            <button className={`audio-toggle ${!isAudioMuted ? 'muted' : ''}`} 
            onClick={toggleAudio}>
              {!isAudioMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
            </button>
            {/* cam off */}
            <button className={`video-toggle ${!isVideoMuted ? 'muted' : ''}`} 
            onClick={toggleVideo}>
              {!isVideoMuted ? <BsCameraVideoOff /> : <BsCameraVideo />}
            </button>

            {/* 이게 통화종료 버튼 */}
              <button 
                className="leave-session" 
                onClick={leaveSession}>
                <MdCallEnd />
              </button>
            {/* 추가 버튼들 */}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;