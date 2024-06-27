import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";

const Camera: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  useEffect(() => {
    startCamera();
    return () => {
      // 컴포넌트가 언마운트될 때 카메라 스트림을 정리합니다.
      if (
        videoRef.current &&
        videoRef.current.srcObject instanceof MediaStream
      ) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCapturing(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      context?.drawImage(
        videoRef.current,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      const imageData = canvasRef.current.toDataURL("image/jpeg");
      detectObject(imageData);
    }
  };

  const detectObject = async (imageData: string) => {
    try {
      const response = await fetch("/api/detect-object", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageData }),
      });
      const result = await response.json();
      matchWithItemList(result.detectedObjects);
    } catch (err) {
      console.error("Error detecting object:", err);
    }
  };

  const matchWithItemList = (detectedObjects: string[]) => {
    const itemList = ["apple", "banana", "orange"]; // 실제 아이템 리스트로 대체해야 합니다.
    const matchedItems = detectedObjects.filter((obj) =>
      itemList.includes(obj)
    );
    if (matchedItems.length > 0) {
      startRegistrationProcess(matchedItems[0]);
    } else {
      console.log("No matching items found");
    }
  };

  const startRegistrationProcess = (item: string) => {
    console.log(`Starting registration process for ${item}`);
    // 등록 프로세스 로직 구현
  };

  return (
    <CameraContainer>
      <Video ref={videoRef} autoPlay playsInline />
      <Canvas ref={canvasRef} width="640" height="480" />
      <Button onClick={captureImage}>Capture</Button>
    </CameraContainer>
  );
};

const CameraContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Video = styled.video`
  width: 100%;
  max-width: 640px;
`;

const Canvas = styled.canvas`
  display: none;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export default Camera;
