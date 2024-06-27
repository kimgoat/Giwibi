import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  id: string;
  name: string;
  imageUrl: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ id, name, imageUrl }) => {
  return (
    <CardContainer to={`/category/${id}`}>
      <CardImage bgPhoto={imageUrl} />
      <CardTitle>{name}</CardTitle>
    </CardContainer>
  );
};

export default CategoryCard;

const CardContainer = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardImage = styled.div<{ bgPhoto: string }>`
  width: 9rem;
  height: 9rem;
  border-radius: ${(props) => props.theme.borderRadius};
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
  box-shadow: ${(props) => props.theme.boxShadow};
`;

const CardTitle = styled.h2`
  position: absolute;
  color: ${(props) => props.theme.colors.neutral.white};
`;
