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
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsListening(true);
      setTranscript("");
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      recognitionRef.current.stop();
      setIsListening(false);
      if (transcript) {
        sendTranscriptToAPI(transcript);
      }
    }
  };

  useEffect(() => {
    const SpeechRecognitionConstructor =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognitionConstructor) {
      recognitionRef.current = new SpeechRecognitionConstructor();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "ko-KR";

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        let finalTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        setTranscript(finalTranscript);

        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          if (finalTranscript) {
            sendTranscriptToAPI(finalTranscript);
            stopListening();
          }
        }, 1500);
      };

      recognitionRef.current.onerror = (event: ErrorEvent) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      // 컴포넌트 마운트 시 즉시 음성 인식 시작
      startListening();
    } else {
      console.log("Speech Recognition is not supported");
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      stopListening();
    };
  }, []);

  const sendTranscriptToAPI = async (text: string) => {
    try {
      const response = await speechApi.createItemFromSpeech(text);
      console.log("API 응답:", response.data);
      if (response.data.success) {
        setModalMessage(
          `아이템 "${response.data.createdItemList[0].name}"이(가) 등록되었습니다.`
        );
        setShowModal(true);
      }
    } catch (error) {
      console.error("API 요청 오류:", error);
      setModalMessage("아이템 등록에 실패했습니다.");
      setShowModal(true);
    }
  };

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <Container>
      <MicButton isListening={isListening} onClick={handleMicClick}>
        <MicIcon className="material-icons">
          <Icon name="mike" size={40} color="white" strokeWidth={0.6} />
        </MicIcon>
        {isListening && <RippleEffect />}
      </MicButton>
      {isListening && (
        <ListeningText>음성을 인식하고 있습니다...</ListeningText>
      )}
      {showModal && (
        <Modal>
          <ModalContent>
            <p>{modalMessage}</p>
            <CloseButton onClick={() => setShowModal(false)}>닫기</CloseButton>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default VoiceRecorder;

const ListeningText = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: ${(props) => props.theme.colors.neutral.lightGrey};
`;

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
  width: 100px;
  height: 100px;
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
    transform: scale(0.9);
    opacity: 1;
  }
  100% {
    transform: scale(3);
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
  background-color: "#41747B";
  opacity: 0;
  animation: ${ripple} 1s linear infinite;
`;

const Modal = styled.div``;

const ModalContent = styled.div``;

const CloseButton = styled.div``;
