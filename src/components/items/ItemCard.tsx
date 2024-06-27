import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface ItemCardProps {
  id: number;
  name: string;
  imageUrl: string;
  usagePeriod: number;
}

const ItemCard: React.FC<ItemCardProps> = ({ id, name, imageUrl }) => {
  return (
    <CardContainer to={`/item/${id}`}>
      <CardImage src={imageUrl} />
      <CardTitle>{name}</CardTitle>
    </CardContainer>
  );
};

export default ItemCard;

const CardContainer = styled(Link)`
  width: 100%;
  display: flex;
  margin-bottom: 10px;
  box-shadow: ${(props) => props.theme.boxShadow};
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
