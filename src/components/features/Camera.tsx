import React, { useRef, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const API_KEY = "UPyBHhD4cCV90cNl8Ceq";
const API_URL = "https://detect.roboflow.com/deteksi-sikat-gigi/1";

const Camera: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject instanceof MediaStream) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  const captureImage = (): string | null => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      context?.drawImage(
        videoRef.current,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      return canvasRef.current.toDataURL("image/jpeg").split(",")[1];
    }
    return null;
  };

  const detectObject = async (imageBase64: string) => {
    try {
      const response = await axios({
        method: "POST",
        url: API_URL,
        params: { api_key: API_KEY },
        data: imageBase64,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      return response.data;
    } catch (error) {
      console.error("Error detecting object:", error);
      return null;
    }
  };

  const handleCapture = async () => {
    const imageBase64 = captureImage();
    if (imageBase64) {
      const result = await detectObject(imageBase64);
      if (result) {
        console.log("Detection Result:", result);

        // 결과 분석 및 페이지 이동 로직
        const highConfidencePrediction = result.predictions.find(
          (pred: any) => pred.confidence >= 0.7
        );

        if (highConfidencePrediction) {
          console.log("High confidence detection:", highConfidencePrediction);
          navigate("/all-timers", {
            state: { detectedObject: highConfidencePrediction },
          });
        } else {
          console.log("No high confidence detection found");
          // 여기에 사용자에게 피드백을 주는 로직을 추가할 수 있습니다.
        }
      }
    }
  };

  return (
    <CameraContainer>
      <Video ref={videoRef} autoPlay playsInline />
      <Canvas ref={canvasRef} width="640" height="480" />
      <Button onClick={handleCapture}>Capture and Detect</Button>
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
