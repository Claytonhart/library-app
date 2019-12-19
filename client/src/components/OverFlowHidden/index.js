import React, { useState } from 'react';
import styled from 'styled-components/macro';

const Hidden = styled.div`
  max-height: ${props => (props.hide ? props.height : 'none')};
  overflow: ${props => (props.hide ? 'hidden' : 'visible')};
  padding: 0 10px;
`;

const ExpandButton = styled.div`
  border-top: 1px solid ${props => props.theme.primary.lightblue};
  color: ${props => props.theme.primary.lightblue};
  text-align: center;
  font-size: 20px;
  cursor: pointer;
  margin: 10px 60px 10px 10px;

  > i {
    transform: ${props => (props.hide ? 'none' : 'rotate(180deg)')};
    padding: 8px;
  }
`;

const OverFlowHidden = props => {
  const [hide, setHide] = useState(true);
  return (
    <>
      <Hidden hide={hide} height={`${props.height}px`}>
        {props.children}
      </Hidden>
      <ExpandButton hide={hide} onClick={() => setHide(!hide)}>
        <i className='fas fa-chevron-down'></i>
      </ExpandButton>
    </>
  );
};

export default OverFlowHidden;
