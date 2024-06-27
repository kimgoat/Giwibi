import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
// import ItemCard from './components/ItemCard';

interface RouteParams {
  categoryId: string;
}

const ItemListPage: React.FC = () => {
  const { categoryId } = useParams();

  // 선택된 카테고리의 아이템 목록을 가져오는 로직

  return (
    <PageContainer>
      <h1>아이템 목록</h1>
      <ItemsGrid>
        {/* 아이템 데이터를 매핑하여 ItemCard 컴포넌트 렌더링 */}
      </ItemsGrid>
    </PageContainer>
  );
};

export default ItemListPage;

const PageContainer = styled.div`
  padding: 20px;
`;

const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
`;
