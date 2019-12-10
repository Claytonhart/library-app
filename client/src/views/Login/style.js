import styled from 'styled-components/macro';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  position: absolute;
  top: 25%;

  p {
    margin-top: 12px;
  }
`;

export const LoginLogo = styled.h3`
  font-size: 64px;
  /* text-decoration: underline;
  text-decoration-color: ${props => props.theme.primary.red}; */
`;
