import { itemsApi } from "@apis/api";
import TimerCard from "@components/items/TimerCard";
import Layout from "@components/layout/Layout";
import { getImageUrl } from "@utils/imageUtils";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface Item {
  id: number;
  name: string;
  status: string;
  categoryId: number;
  imageKey: string;
}

const AllTimersPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await itemsApi.getAllItems();
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching Items:", error);
      }
    };

    fetchItems();
  }, []);

  return (
    <Layout>
      <PageContainer>
        {items.map((item) => (
          <TimerCard
            id={item.id}
            name={item.name}
            status={item.status}
            categoryId={item.categoryId}
            imageUrl={getImageUrl(item.imageKey)}
          />
        ))}
      </PageContainer>
    </Layout>
  );
};

export default AllTimersPage;

const PageContainer = styled.div``;
