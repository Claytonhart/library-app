import React, { useState } from 'react';
import styled from 'styled-components/macro';

import AddToListDropdown from './AddToListDropdown';
import DropdownContainer from 'utils/DropdownContainer';

const AddContainer = styled.div`
  display: inline-block;
  position: relative;
  margin-bottom: 20px;
`;

const AddButton = styled.button`
  padding: 12px 24px;
  border: 1px solid ${props => props.theme.primary.lightblue};
  color: ${props => props.theme.primary.lightblue};
  cursor: pointer;
  transition: all 0.2s ease-in;
  position: relative;

  &:hover {
    background-color: ${props => props.theme.primary.lightblue};
    color: #fff;
  }
`;

const AddIcon = styled.i`
  font-size: 18px;
  margin-left: 5px;
  transform: translateY(2px);
`;

const AddToList = ({ bookinfo }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleShowDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <AddContainer>
      <AddButton onClick={toggleShowDropdown}>
        Add To My Booklist <AddIcon className='fas fa-angle-down'></AddIcon>
      </AddButton>
      {showDropdown && (
        <DropdownContainer
          callback={setShowDropdown}
          show={showDropdown}
          left={'0px'}
          right={'0px'}
        >
          <AddToListDropdown bookinfo={bookinfo} />
        </DropdownContainer>
      )}
    </AddContainer>
  );
};

export default AddToList;
