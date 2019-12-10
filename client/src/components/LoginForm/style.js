import styled from 'styled-components/macro';

export const LoginForm = styled.form`
  margin-top: 12px;
  width: 350px;
  display: flex;
  flex-direction: column;
`;

export const LoginInput = styled.input`
  padding: 12px;
  margin: 8px;
  border: 1px solid gainsboro;
  border-radius: 5px;
`;

export const LoginButton = styled.input`
  background-color: ${props => props.theme.primary.lightblue};
  color: #fff;
  padding: 12px;
  margin: 8px;
  cursor: pointer;
  border: none;
`;

export const LoginError = styled.span`
  padding: 12px;
  color: red;
  text-align: center;
`;
