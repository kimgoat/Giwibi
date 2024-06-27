import React, { useRef, useState } from "react";
import styled from "styled-components";

const Camera: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);

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
    // 여기서 객체 탐지 로직을 구현합니다.
    // TensorFlow.js를 사용하거나 서버에 이미지를 전송하여 처리할 수 있습니다.
    // 예시로 서버에 전송하는 방법을 보여드리겠습니다.
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
    // 여기서 탐지된 객체와 아이템 리스트를 매칭합니다.
    // 예시:
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
    // 여기서 아이템 등록 프로세스를 시작합니다.
    console.log(`Starting registration process for ${item}`);
    // 등록 페이지로 네비게이션하거나 모달을 열 수 있습니다.
  };

  return (
    <CameraContainer>
      <Video ref={videoRef} autoPlay playsInline />
      <Canvas ref={canvasRef} width="640" height="480" />
      {!isCapturing && <Button onClick={startCamera}>Start Camera</Button>}
      {isCapturing && <Button onClick={captureImage}>Capture</Button>}
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
