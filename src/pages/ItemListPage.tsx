import { categoriesApi } from "@apis/api";
import SearchBar from "@components/common/SearchBar";
import ItemCard from "@components/items/ItemCard";
import Layout from "@components/layout/Layout";
import { getImageUrl } from "@utils/imageUtils";
import React, { useEffect, useState } from "react";
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

interface Category {
  id: number;
  name: string;
  usagePeriod: number;
  imageKey: string;
}

const ItemListPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const { categoryId } = useParams();

  useEffect(() => {
    const fetchCategoriesByFolder = async (folderId: number) => {
      try {
        const response = await categoriesApi.getCategoriesByFolder(folderId);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategoriesByFolder(Number(categoryId));
  }, []);

  return (
    <Layout>
      <PageContainer>
        <ItemsGrid>
          {categories.map((item) => (
            <ItemCard
              key={item.id}
              id={item.id}
              name={item.name}
              usagePeriod={item.usagePeriod}
              imageUrl={getImageUrl(item.imageKey)}
            />
          ))}
        </ItemsGrid>
      </PageContainer>
    </Layout>
  );
};

export default ItemListPage;

const PageContainer = styled.div``;

const ItemsGrid = styled.div``;
