import React, { useEffect, useState } from "react";
import Layout from "@components/layout/Layout";
import styled from "styled-components";
import CategoryCard from "@components/items/CategoryCard";
import Test from "./Test";
import { foldersApi } from "@apis/api";

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

interface Category {
  id: number;
  name: string;
}

const MainCategoryPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await foldersApi.getAllFolders();
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Layout>
      <CategoryGrid>
        {categories.map((item) => (
          <CategoryCard
            id={item.id}
            name={item.name}
            // imageUrl={item.imageUrl}
            imageUrl="https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/snapshots/168839197074353597.jpeg?gif=1&w=480&h=480&c=c&q=80&webp=1"
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
  grid-gap: 14px;
  justify-content: center;
`;
