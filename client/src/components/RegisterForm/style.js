import styled from 'styled-components/macro';

export const Form = styled.form`
  width: 350px;
  display: flex;
  flex-direction: column;
  margin-top: 12px;
`;

export const RegisterInput = styled.input`
  padding: 12px;
  margin: 8px;
  border: 1px solid gainsboro;
  border-radius: 5px;
`;

export const RegisterButton = styled.input`
  background-color: ${props => props.theme.primary.lightblue};
  color: #fff;
  padding: 12px;
  margin: 8px;
  cursor: pointer;
  border: none;
`;

export const RegisterError = styled.span`
  padding: 12px;
  color: red;
  text-align: center;
`;
