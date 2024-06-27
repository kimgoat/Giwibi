import React from "react";
import styled from "styled-components";

interface TimerCardProps {
  id: number;
  name: string;
  status: string;
  categoryId: number;
  imageUrl: string;
}

const TimerCard: React.FC<TimerCardProps> = ({
  id,
  name,
  status,
  categoryId,
  imageUrl,
}) => {
  return (
    <CardContainer>
      <CardImage src={imageUrl} />
      <CardTitle>{name}</CardTitle>
    </CardContainer>
  );
};

export default TimerCard;

const CardContainer = styled.div`
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
