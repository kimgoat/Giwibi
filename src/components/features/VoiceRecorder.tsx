import { speechApi } from "@apis/api";
import Icon from "../common/Icon";
import React, { useState, useRef, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";

// SpeechRecognition 타입 정의
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
  length: number;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: ErrorEvent) => void;
  start: () => void;
  stop: () => void;
}

// 전역 SpeechRecognition 타입 선언
declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

const VoiceRecorder: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [waveHeights, setWaveHeights] = useState(Array(10).fill(5));
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isListening) {
      interval = setInterval(() => {
        setWaveHeights(waveHeights.map(() => Math.random() * 45 + 5));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isListening]);

  useEffect(() => {
    // Speech Recognition 초기화
    const SpeechRecognitionConstructor =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognitionConstructor) {
      recognitionRef.current = new SpeechRecognitionConstructor();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "ko-KR"; // 한국어로 설정

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            // console.log("인식된 음성:", event.results[i][0].transcript);
            sendTranscriptToAPI(event.results[i][0].transcript);
          }
        }
      };

      recognitionRef.current.onerror = (event: ErrorEvent) => {
        console.error("Speech recognition error", event.error);
      };
    } else {
      console.log("Speech Recognition is not supported");
    }
  }, []);

  const sendTranscriptToAPI = async (transcript: string) => {
    try {
      const response = await speechApi.createItemFromSpeech(transcript);
      console.log("API 응답:", response.data);
      // 여기에서 API 응답을 처리하는 로직을 추가할 수 있습니다.
    } catch (error) {
      console.error("API 요청 오류:", error);
    }
  };

  const handleMicClick = () => {
    if (!isListening) {
      recognitionRef.current?.start();
    } else {
      recognitionRef.current?.stop();
    }
    setIsListening(!isListening);
  };

  return (
    <Container>
      <MicButton isListening={isListening} onClick={handleMicClick}>
        <MicIcon className="material-icons">
          <Icon name="mike" size={28} color="white" strokeWidth={0.6} />
        </MicIcon>
        {isListening && <RippleEffect />}
      </MicButton>
    </Container>
  );
};

export default VoiceRecorder;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(74, 144, 226, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(74, 144, 226, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(74, 144, 226, 0);
  }
`;

const MicButton = styled.button<{ isListening: boolean }>`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.primary.dark};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  ${(props) =>
    props.isListening &&
    css`
      animation: ${pulse} 1.5s infinite;
    `}
`;

const MicIcon = styled.i`
  display: flex;
`;

const ripple = keyframes`
  0% {
    transform: scale(0.8);
    opacity: 1;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RippleEffect = styled.div`
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.primary};
  opacity: 0;
  animation: ${ripple} 1s linear infinite;
`;
