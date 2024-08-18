import React, { useEffect, useState, useRef } from 'react';

function CameraPermission() {
  const [error, setError] = useState('');
  const videoRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        setError('Permission denied or no media devices found.');
        console.error("Error accessing media devices:", err);
      });
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      <video ref={videoRef} autoPlay />
    </div>
  );
}

export default CameraPermission;
