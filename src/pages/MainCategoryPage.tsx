import React from "react";
import Layout from "@components/layout/Layout";
import styled from "styled-components";
import CategoryCard from "@components/items/CategoryCard";

const test = [
  {
    id: "1",
    name: "욕실용품",
    imageUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/snapshots/168839197074353597.jpeg?gif=1&w=480&h=480&c=c&q=80&webp=1",
  },
  {
    id: "2",
    name: "식자재",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUj8cOBpBCZtNojFXyU8FsQl8Eg2sWeQ4M2Q&s",
  },
];

const MainCategoryPage: React.FC = () => {
  return (
    <Layout>
      <CategoryGrid>
        {test.map((item) => (
          <CategoryCard
            id={item.id}
            name={item.name}
            imageUrl={item.imageUrl}
          />
        ))}
      </CategoryGrid>
    </Layout>
  );
};

export default MainCategoryPage;

const CategoryGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-gap: 12px;
  justify-content: center;
`;
