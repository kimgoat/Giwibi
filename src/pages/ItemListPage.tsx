import SearchBar from "@components/common/SearchBar";
import ItemCard from "@components/items/ItemCard";
import Layout from "@components/layout/Layout";
import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
// import ItemCard from './components/ItemCard';

interface RouteParams {
  categoryId: string;
}

const test = [
  {
    id: "1",
    name: "칫솔",
    imageUrl:
      "https://rebrush.co.kr/wp-content/uploads/2021/06/1-soft-toothbrush-white-230527.png",
  },
  {
    id: "2",
    name: "샤워볼",
    imageUrl:
      "https://m.yuripibu.com/web/product/tiny/202111/01e0152180373070af800cc798553ccf.png",
  },
];

const ItemListPage: React.FC = () => {
  const { categoryId } = useParams();

  // 선택된 카테고리의 아이템 목록을 가져오는 로직

  return (
    <Layout>
      <PageContainer>
        <SearchBar />
        <ItemsGrid>
          {test.map((item) => (
            <ItemCard id={item.id} name={item.name} imageUrl={item.imageUrl} />
          ))}
        </ItemsGrid>
      </PageContainer>
    </Layout>
  );
};

export default ItemListPage;

const PageContainer = styled.div``;

const ItemsGrid = styled.div``;
