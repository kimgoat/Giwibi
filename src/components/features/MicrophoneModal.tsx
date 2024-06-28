import React from "react";
import styled from "styled-components";
import VoiceRecorder from "./VoiceRecorder";

interface MicrophoneModalProps {
  onClose: () => void;
}

const MicrophoneModal: React.FC<MicrophoneModalProps> = ({ onClose }) => {
  // 여기에 마이크 관련 로직을 구현하세요
  return (
    <ModalOverlay>
      <ModalContent>
        <VoiceRecorder />
        <CloseButton onClick={onClose}>Close</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default MicrophoneModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  /* background-color: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 90%;
  max-height: 90%;
  overflow: auto; */
`;

const CloseButton = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
