import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSwipeable } from "react-swipeable";
import { itemsApi } from "@apis/api";
interface TimerCardProps {
  id: number;
  name: string;
  status: string;
  categoryId: number;
  imageUrl: string;
  imageKey: string;
  onDelete: (id: number) => void;
}

const TimerCard: React.FC<TimerCardProps> = ({
  id,
  name,
  status,
  categoryId,
  imageUrl,
  imageKey,
  onDelete,
}) => {
  const [isSlided, setIsSlided] = useState(false);

  const handlers = useSwipeable({
    onSwipedLeft: () => setIsSlided(true),
    onSwipedRight: () => setIsSlided(false),
    trackMouse: true,
  });

  const handleDelete = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      itemsApi
        .deleteItem(id, imageKey)
        .then((response) => {
          onDelete(id);
        })
        .catch((error) => {
          console.error("Error deleting item:", error);
        });
    }
  };

  return (
    <CardWrapper {...handlers}>
      <CardContainer isSlided={isSlided}>
        <CardContent isSlided={isSlided}>
          <CardImage src={imageUrl} />
          <CardTitle>{name}</CardTitle>
        </CardContent>
        <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
      </CardContainer>
    </CardWrapper>
  );
};

export default TimerCard;

const CardContent = styled.div<{ isSlided: boolean }>`
  display: flex;
  transition: transform 0.3s ease;
  transform: translateX(${(props) => (props.isSlided ? "80px" : "0")});
`;

const DeleteButton = styled.div`
  font-size: ${(props) => props.theme.fontSizes.medium};
  align-items: center;
  display: flex;
  justify-content: center;
  color: ${(props) => props.theme.colors.neutral.lightGrey};
  width: 80px;
  height: 100%;
  position: absolute;
  right: -80px;
  background-color: ${(props) => props.theme.colors.semantic.error};
`;

const CardWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  margin-bottom: 10px;
  box-shadow: ${(props) => props.theme.boxShadow};
`;

const CardContainer = styled.div<{ isSlided: boolean }>`
  width: 100%;
  display: flex;
  transition: transform 0.3s ease;
  transform: translateX(${(props) => (props.isSlided ? "-80px" : "0")});
`;

const CardImage = styled.img`
  width: 3rem;
  height: 3rem;
  background-size: cover;
  border-radius: ${(props) => props.theme.borderRadius};
  margin: 0px 5px;
`;

const CardTitle = styled.p`
  color: ${(props) => props.theme.colors.neutral.darkGrey};
  font-size: ${(props) => props.theme.fontSizes.medium};
  align-items: center;
  margin-left: 13px;
  display: flex;
`;
