import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components/macro';

const Authors = styled.div``;
const AuthorName = styled.p``;
const AverageRating = styled.div``;
const RatingsCount = styled.div``;
const Categories = styled.div``;
const CategoryName = styled.p``;
const Description = styled.div``;
const ImageLinks = styled.div``;
const PageCount = styled.div``;
const PreviewLink = styled.div``;
const PublishedDate = styled.div``;
const Publisher = styled.div``;
const Title = styled.div``;

const BookView = () => {
  const [bookData, setBookData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const baseUrl = `https://www.googleapis.com/books/v1/volumes/${id}`;
      let res = await axios.get(baseUrl);
      let book = res.data.volumeInfo;

      setBookData(book);
      setIsLoading(false);
    })();
  }, [id]);

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
  } = bookData;

  return (
    <div>
      {!isLoading && (
        <>
          <span>id: {id}</span>
          <Title>{title}</Title>
          <Description>{description}</Description>
          <Authors>
            by{' '}
            {authors.map((author, i) => (
              <AuthorName key={i}>{author}</AuthorName>
            ))}
          </Authors>
          <Categories>
            Categories:
            {categories.map((category, i) => (
              <CategoryName key={i}>{category}</CategoryName>
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
            <a href={previewLink} target='_blank' rel='noopener noreferrer'>
              Preview on google books
            </a>
          </PreviewLink>
        </>
      )}
    </div>
  );
};

export default BookView;
