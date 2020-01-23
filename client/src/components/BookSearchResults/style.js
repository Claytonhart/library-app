import styled from 'styled-components/macro';

export const Container = styled.div`
  margin: 0 auto;
  padding: 20px 0;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.h2`
  font-size: 30px;
`;

export const CurrentPage = styled.div``;

export const TotalPages = styled.div``;

export const TotalResults = styled.div`
  /*  */
`;

export const PaginationLinks = styled.div`
  display: flex;
  justify-content: space-between;
  align-self: stretch;
`;

export const Prev = styled.button`
  background: ${props => props.theme.primary.lightblue};
  color: #fff;
  padding: 10px 20px;
  cursor: pointer;
`;
export const Next = styled.button`
  background: ${props => props.theme.primary.lightblue};
  color: #fff;
  padding: 10px 20px;
  cursor: pointer;
`;
