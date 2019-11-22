import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';

import notfound from 'assets/images/notfound.svg';

const Container = styled.div`
  display: flex;
  flex-basis: 50%;
  padding: 10px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Image = styled.div`
  min-height: 200px;
  width: 128px;
  min-width: 128px;
  background: url(${props => props.image}) no-repeat center center;
  background-size: cover;
`;

const Title = styled.div`
  font-size: 16px;
  color: ${props => props.theme.primary.lightblue};
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  color: #555;
  font-weight: 700;
  font-size: 13px;

  span {
    color: #aaa;
    font-size: 12px;
    font-weight: 400;
  }
`;

const Authors = styled.div`
  /*  */
`;

const BookItem = props => {
  const { volumeInfo, id } = props.book;

  const {
    authors, // ["string"]
    averageRating = 'N/A', // number 1-5
    // imageLinks = notfound, // {'smallThumbnail', 'thumbnail'}
    publishedDate = 'N/A', // 'string' - '2016-07-31'
    title = 'N/A' // 'string'
  } = volumeInfo;

  let image;
  if (volumeInfo.imageLinks) {
    image =
      volumeInfo.imageLinks.thumbnail || volumeInfo.imageLinks.smallThumbnail;
  } else {
    image = notfound;
  }

  const realeaseYear = publishedDate.substring(0, 4);

  return (
    <Container>
      <Link to={`/books/${id}`}>
        <Image image={image} />
      </Link>
      <InfoContainer>
        <Title>{title}</Title>
        <Authors>{authors.join(', ')}</Authors>
        <Info>
          <InfoItem>
            <span>Year</span>
            {realeaseYear}
          </InfoItem>
          <InfoItem>
            <span>Rating</span>
            {averageRating}
          </InfoItem>
        </Info>
      </InfoContainer>
    </Container>
  );
};

export default BookItem;
