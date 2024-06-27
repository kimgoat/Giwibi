import Icon from "../common/Icon";
import React, { useState, useRef, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";

const VoiceRecorder: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [waveHeights, setWaveHeights] = useState(Array(10).fill(5));

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isListening) {
      interval = setInterval(() => {
        setWaveHeights(waveHeights.map(() => Math.random() * 45 + 5));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isListening]);

  const handleMicClick = () => {
    setIsListening(!isListening);
    // 여기에 음성 인식 시작/중지 로직 추가
  };

  return (
    <Container>
      <MicButton isListening={isListening} onClick={handleMicClick}>
        <MicIcon className="material-icons">
          <Icon name="mike" size={28} color="white" strokeWidth={0.6} />
          {/* {isListening ? "mic" : <Icon name="mike" />} */}
        </MicIcon>
        {isListening && <RippleEffect />}
      </MicButton>
      {/* {isListening && (
        <WaveContainer>
          {waveHeights.map((height, index) => (
            <Wave key={index} height={height} />
          ))}
        </WaveContainer>
      )} */}
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
  background-color: ${(props) => props.theme.colors.primary};
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

const WaveContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 50px;
  width: 100px;
  margin-top: 20px;
`;

const Wave = styled.div<{ height: number }>`
  width: 5px;
  margin: 0 2px;
  background-color: ${(props) => props.theme.colors.primary};
  height: ${(props) => props.height}px;
  transition: height 0.1s ease;
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
