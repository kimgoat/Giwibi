import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
// import TimerDisplay from './components/TimerDisplay';
// import RegisterTimerModal from './components/RegisterTimerModal';

interface RouteParams {
  itemId: string;
}

const ItemTimerPage: React.FC = () => {
  const { itemId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 아이템 및 타이머 데이터를 가져오는 로직

  return (
    <PageContainer>
      <h1>아이템 타이머</h1>
      {/* <TimerDisplay /> */}
      <Button onClick={() => setIsModalOpen(true)}>새 타이머 등록</Button>
      {/* {isModalOpen && (
        <RegisterTimerModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={(timerData) => {
            // 타이머 등록 로직
            setIsModalOpen(false);
          }}
        />
      )} */}
    </PageContainer>
  );
};

export default ItemTimerPage;

const PageContainer = styled.div`
  padding: 20px;
`;

const Button = styled.button`
  // 버튼 스타일링
`;
