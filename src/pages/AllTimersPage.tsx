import Layout from "@components/layout/Layout";
import React from "react";
import styled from "styled-components";
// import TimerListItem from './components/TimerListItem';

const AllTimersPage: React.FC = () => {
  // 모든 타이머 데이터를 가져오고 정렬하는 로직

  return (
    <Layout>
      <PageContainer>
        <h1>모든 타이머</h1>
        <TimerList>
          {/* 타이머 데이터를 매핑하여 TimerListItem 컴포넌트 렌더링 */}
        </TimerList>
      </PageContainer>
    </Layout>
  );
};

export default AllTimersPage;

const PageContainer = styled.div`
  padding: 20px;
`;

const TimerList = styled.ul`
  list-style-type: none;
  padding: 0;
`;
