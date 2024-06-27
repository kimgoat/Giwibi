import React, { useEffect, useState } from "react";
import Layout from "@components/layout/Layout";
import styled from "styled-components";
import CategoryCard from "@components/items/CategoryCard";
import { foldersApi } from "@apis/api";
import { getImageUrl } from "@utils/imageUtils";

interface Category {
  id: number;
  name: string;
  imageKey: string;
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
      <Container>
        <CategoryGrid>
          {categories.map((item) => (
            <CategoryCard
              id={item.id}
              name={item.name}
              imageUrl={getImageUrl(item.imageKey)}
            />
          ))}
        </CategoryGrid>
      </Container>
    </Layout>
  );
};

export default MainCategoryPage;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px;
`;
