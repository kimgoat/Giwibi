import React from "react";
import styled from "styled-components";
import Camera from "./Camera"; // 이전에 만든 Camera 컴포넌트

interface CameraModalProps {
  onClose: () => void;
}

const CameraModal: React.FC<CameraModalProps> = ({ onClose }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <Camera />
        <CloseButton onClick={onClose}>Close</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

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
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
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

export default CameraModal;
