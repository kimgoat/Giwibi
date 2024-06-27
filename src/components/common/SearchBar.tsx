import React from "react";
import styled from "styled-components";
import Icon from "./Icon";

const SearchBar: React.FC = () => {
  return (
    <SearchBarContainer>
      <Icon name="search" />
      <input />
    </SearchBarContainer>
  );
};

export default SearchBar;

const SearchBarContainer = styled.div`
  display: flex;
  height: 2rem;
  svg {
    position: fixed;
  }

  input {
    border: none;
    width: 100%;
  }
`;
