import { itemsApi } from "@apis/api";
import Icon from "@components/common/Icon";
import RegisterTimerModal from "@components/features/RegisterTimerModal";
import ItemCard from "@components/items/ItemCard";
import TimerCard from "@components/items/TimerCard";
import Layout from "@components/layout/Layout";
import { getImageUrl } from "@utils/imageUtils";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
// import TimerDisplay from './components/TimerDisplay';

interface Item {
  id: number;
  name: string;
  status: string;
  categoryId: number;
  imageKey: string;
}

const ItemTimerPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const { itemId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchItemsByCategory = async (categoryId: number) => {
      try {
        const response = await itemsApi.getItemsByCategory(categoryId);
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItemsByCategory(Number(itemId));
  }, []);

  const handleDelete = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

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
            imageKey={item.imageKey}
            onDelete={handleDelete}
          />
        ))}

        <AddButton onClick={() => setIsModalOpen(true)}>
          <Icon name="add" size={15} />
        </AddButton>

        {isModalOpen && (
          <RegisterTimerModal
            categoryId={itemId ? itemId : ""}
            onClose={() => setIsModalOpen(false)}
            onSubmit={(timerData) => {
              // 타이머 등록 로직
              setIsModalOpen(false);
            }}
          />
        )}
      </PageContainer>
    </Layout>
  );
};

export default ItemTimerPage;

const PageContainer = styled.div``;

const AddButton = styled.div`
  position: fixed;
  background-color: ${(props) => props.theme.colors.neutral.white};
  box-shadow: ${(props) => props.theme.boxShadow};
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  bottom: 70px;
  right: 20px;
`;
