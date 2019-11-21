import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components/macro';

const Authors = styled.div``;
const AverageRating = styled.div``;
const RatingsCount = styled.div``;
const Categories = styled.div``;
const Description = styled.div``;
const ImageLinks = styled.div``;
const PageCount = styled.div``;
const PreviewLink = styled.div``;
const PublishedDate = styled.div``;
const Publisher = styled.div``;
const Title = styled.div``;

const BookView = ({ book }) => {
  const { id } = useParams();
  const { volumeInfo } = book;

  const {
    authors, // ["string"]
    averageRating, // number 1-5
    ratingsCount, // number
    categories, // ["string"]
    description, // 'string'
    imageLinks, // {'smallThumbnail', 'thumbnail'}
    pageCount, // number
    previewLink, // 'string'
    publishedDate, // 'string' - '2016-07-31'
    publisher, // 'string'
    title // 'string'
  } = volumeInfo;

  return (
    <div>
      <span>id: {id}</span>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Authors>
        by{' '}
        {authors.map(author => (
          <p>{author}</p>
        ))}
      </Authors>
      <Categories>
        Categories:
        {categories.map(category => (
          <p>{category}</p>
        ))}
      </Categories>
      <Publisher>Published by: {publisher}</Publisher>
      <AverageRating>Average rating: {averageRating}</AverageRating>
      <RatingsCount>Number of ratings: {ratingsCount}</RatingsCount>
      <ImageLinks>
        <img
          src={imageLinks.thumnail || imageLinks.smallThumbnail}
          alt='book cover'
        />
      </ImageLinks>
      <PageCount>Pages: {pageCount}</PageCount>
      <PublishedDate>Published on: {publishedDate}</PublishedDate>
      <PreviewLink>
        <a href={previewLink}>Preview on google books</a>
      </PreviewLink>
    </div>
  );
};

export default BookView;
