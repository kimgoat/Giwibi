// import React, { useRef, useEffect, useState } from "react";
// import axios from "axios";
// import styled from "styled-components";
// import { useNavigate } from "react-router-dom";
// import { speechApi } from "@apis/api";

// const API_KEY = "UPyBHhD4cCV90cNl8Ceq";
// const API_URL = "https://detect.roboflow.com/deteksi-sikat-gigi/1";

// const Camera: React.FC = () => {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const navigate = useNavigate();

//   const [isCapturing, setIsCapturing] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showResult, setShowResult] = useState(false);

//   useEffect(() => {
//     startCamera();
//     return () => {
//       stopCamera();
//     };
//   }, []);

//   const startCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: { facingMode: "environment" },
//       });
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//       }
//     } catch (err) {
//       console.error("Error accessing camera:", err);
//     }
//   };

//   const stopCamera = () => {
//     if (videoRef.current && videoRef.current.srcObject instanceof MediaStream) {
//       const tracks = videoRef.current.srcObject.getTracks();
//       tracks.forEach((track) => track.stop());
//     }
//   };

//   const captureImage = (): string | null => {
//     if (videoRef.current && canvasRef.current) {
//       const context = canvasRef.current.getContext("2d");
//       context?.drawImage(
//         videoRef.current,
//         0,
//         0,
//         canvasRef.current.width,
//         canvasRef.current.height
//       );
//       return canvasRef.current.toDataURL("image/jpeg").split(",")[1];
//     }
//     return null;
//   };

//   const detectObject = async (imageBase64: string) => {
//     try {
//       const response = await axios({
//         method: "POST",
//         url: API_URL,
//         params: { api_key: API_KEY },
//         data: imageBase64,
//         headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       });
//       return response.data;
//     } catch (error) {
//       console.error("Error detecting object:", error);
//       return null;
//     }
//   };

//   const handleCapture = async () => {
//     setIsCapturing(true);
//     setTimeout(() => {
//       setIsCapturing(false);
//       const imageBase64 = captureImage();
//       if (imageBase64) {
//         setIsLoading(true);
//         detectObject(imageBase64).then((result) => {
//           setIsLoading(false);
//           if (result) {
//             console.log("Detection Result:", result);

//             const highConfidencePrediction = result.predictions.find(
//               (pred: any) => pred.confidence >= 0.4
//             );

//             if (highConfidencePrediction) {
//               console.log(
//                 "High confidence detection:",
//                 highConfidencePrediction
//               );
//               sendTranscriptToAPI("칫솔");
//               setShowResult(true);
//               setTimeout(() => {
//                 setShowResult(false);
//                 navigate("/all-timers", {
//                   state: { detectedObject: highConfidencePrediction },
//                 });
//               }, 2000);
//             } else {
//               console.log("No high confidence detection found");
//               // 여기에 사용자에게 피드백을 주는 로직을 추가할 수 있습니다.
//             }
//           }
//         });
//       }
//     }, 1000); // 1초 후에 캡처 모션 종료
//   };

//   const sendTranscriptToAPI = async (text: string) => {
//     try {
//       const response = await speechApi.createItemFromSpeech(text);
//       console.log("API 응답:", response.data);
//     } catch (error) {
//       console.error("API 요청 오류:", error);
//     }
//   };

//   return (
//     <CameraContainer>
//       <Video ref={videoRef} autoPlay playsInline />
//       <Canvas ref={canvasRef} width="640" height="480" />
//       <Button onClick={handleCapture} disabled={isCapturing || isLoading}>
//         Capture and Detect
//       </Button>
//       {isCapturing && <Popup>사진을 캡처중입니다...</Popup>}
//       {isLoading && <Popup>사진을 분석중입니다...</Popup>}
//       {showResult && <Popup>"칫솔"을 등록합니다.</Popup>}
//     </CameraContainer>
//   );
// };

// const Popup = styled.div`
//   position: fixed;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   background-color: rgba(0, 0, 0, 0.8);
//   color: white;
//   padding: 20px;
//   border-radius: 10px;
//   z-index: 1000;
// `;

// const CameraContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const Video = styled.video`
//   width: 100%;
//   max-width: 640px;
// `;

// const Canvas = styled.canvas`
//   display: none;
// `;

// const Button = styled.button`
//   margin-top: 10px;
//   padding: 10px 20px;
//   background-color: #007bff;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
// `;

// export default Camera;

import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { speechApi } from "@apis/api";

const API_KEY = "UPyBHhD4cCV90cNl8Ceq";
const API_URL = "https://detect.roboflow.com/deteksi-sikat-gigi/1";

interface DetectionResult {
  class: string;
  class_id: number;
  confidence: number;
  height: number;
  width: number;
  x: number;
  y: number;
}

const Camera: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();

  const [isCapturing, setIsCapturing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [detectionResult, setDetectionResult] =
    useState<DetectionResult | null>(null);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  useEffect(() => {
    if (detectionResult) {
      drawBoundingBox(detectionResult);
    }
  }, [detectionResult]);

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

  const drawBoundingBox = (result: DetectionResult) => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.strokeRect(result.x, result.y, result.width, result.height);

        ctx.fillStyle = "red";
        ctx.font = "16px Arial";
        ctx.fillText(
          `칫솔 (${(result.confidence * 100).toFixed(2)}%)`,
          result.x,
          result.y - 5
        );
      }
    }
  };

  const handleCapture = async () => {
    setIsCapturing(true);
    setTimeout(() => {
      setIsCapturing(false);
      const imageBase64 = captureImage();
      if (imageBase64) {
        setIsLoading(true);
        detectObject(imageBase64).then((result) => {
          setIsLoading(false);
          if (result) {
            console.log("Detection Result:", result);

            const highConfidencePrediction = result.predictions.find(
              (pred: DetectionResult) => pred.confidence >= 0.4
            );

            if (highConfidencePrediction) {
              console.log(
                "High confidence detection:",
                highConfidencePrediction
              );
              setDetectionResult(highConfidencePrediction);
              sendTranscriptToAPI("칫솔");
              setShowResult(true);
              setTimeout(() => {
                setShowResult(false);
                navigate("/all-timers", {
                  state: { detectedObject: highConfidencePrediction },
                });
              }, 2000);
            } else {
              console.log("No high confidence detection found");
              // 여기에 사용자에게 피드백을 주는 로직을 추가할 수 있습니다.
            }
          }
        });
      }
    }, 1000);
  };

  const sendTranscriptToAPI = async (text: string) => {
    try {
      const response = await speechApi.createItemFromSpeech(text);
      console.log("API 응답:", response.data);
    } catch (error) {
      console.error("API 요청 오류:", error);
    }
  };

  return (
    <CameraContainer>
      <VideoContainer>
        <Video ref={videoRef} autoPlay playsInline />
        <Canvas ref={canvasRef} width="640" height="480" />
      </VideoContainer>
      <Button onClick={handleCapture} disabled={isCapturing || isLoading}>
        Capture and Detect
      </Button>
      {isCapturing && <Popup>사진을 캡처중입니다...</Popup>}
      {isLoading && <Popup>사진을 분석중입니다...</Popup>}
      {showResult && <Popup>"칫솔"을 등록합니다.</Popup>}
    </CameraContainer>
  );
};

const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 20px;
  border-radius: 10px;
  z-index: 1000;
`;

const CameraContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 640px;
`;

const Video = styled.video`
  width: 100%;
`;

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
