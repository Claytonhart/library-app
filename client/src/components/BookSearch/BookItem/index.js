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

const ImageLinks = styled.div`
  min-height: 200px;
`;
const Image = styled.img`
  max-width: 128px;
`;
const Title = styled.div``;
const PublishedDate = styled.div`
  display: flex;
  flex-direction: column;
`;
const AverageRating = styled.div`
  display: flex;
  flex-direction: column;
`;

const BookItem = ({ book }) => {
  const { volumeInfo, id } = book;

  const {
    averageRating = 'N/A', // number 1-5
    imageLinks = notfound, // {'smallThumbnail', 'thumbnail'}
    publishedDate = 'N/A', // 'string' - '2016-07-31'
    title = 'N/A' // 'string'
  } = volumeInfo;

  const realeaseYear = publishedDate.substring(0, 4);

  return (
    <Container>
      <ImageLinks>
        <Link to={`/books/${id}`}>
          <img src={imageLinks.thumbnail} alt={title} />
          {/* {imageLinks ? (
            <Image
              src={imageLinks.thumnail || imageLinks.smallThumbnail}
              alt='book cover'
            />
          ) : (
            <Image src={notfound} alt='not found' />
          )} */}
        </Link>
      </ImageLinks>
      <InfoContainer>
        <Title>{title}</Title>
        <Info>
          <PublishedDate>
            <span>Year</span>
            {realeaseYear}
          </PublishedDate>
          <AverageRating>
            <span>Rating</span>
            {averageRating}
          </AverageRating>
        </Info>
      </InfoContainer>
    </Container>
  );
};

export default BookItem;
