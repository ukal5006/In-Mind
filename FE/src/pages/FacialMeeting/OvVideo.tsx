import React, { useEffect, useRef } from 'react';
import { StreamManager } from 'openvidu-browser';

interface OpenViduVideoComponentProps {
  streamManager: StreamManager;
}

const OpenViduVideoComponent: React.FC<OpenViduVideoComponentProps> = ({ streamManager }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return <video autoPlay ref={videoRef} />;
};

export default OpenViduVideoComponent;