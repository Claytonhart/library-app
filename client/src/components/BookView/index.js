import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components/macro';

import Description from './Description';
import notfound from 'assets/images/notfound.svg';

import { parseCategories } from 'utils/parseCategories';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Banner = styled.div`
  /* https://stackoverflow.com/questions/15852122/hex-transparency-in-colors/17239853#17239853 */
  background-image: linear-gradient(to bottom, #12130fcc, #ffffff4d),
    url(${props => props.image});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  height: 400px;
  width: 100%;
  position: absolute;
  top: 0;
  z-index: -1;
`;

const BookInfo = styled.div`
  display: flex;
  color: #fff;
`;

const Left = styled.div`
  flex-basis: 400px;
  margin-top: 100px;
  padding: 20px;
`;
const Right = styled.div`
  flex: 1;
  margin-top: 150px;
`;

const RightTop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 0;
  height: 250px;
`;
const RightBottom = styled.div`
  color: initial;
`;

const Title = styled.h1``;

const Authors = styled.div``;
const AuthorName = styled.p`
  display: inline-block;
`;

const BookType = styled.p``;
const AverageRating = styled.div``;
const RatingsCount = styled.div``;
const Categories = styled.div`
  margin-top: 10px;
  color: ${props => props.theme.primary.lightblue};
`;
const CategoryName = styled.p``;
// const Description = styled.div``;
const Image = styled.img`
  max-width: 90%;
`;
const PageCount = styled.div``;
const PreviewLink = styled.div``;
const PublishedDate = styled.div``;
const Publisher = styled.div``;

const BookView = () => {
  const [bookData, setBookData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const baseUrl = `https://www.googleapis.com/books/v1/volumes/${id}`;
      let res = await axios.get(baseUrl);
      let book = res.data.volumeInfo;

      let categories = parseCategories(book.categories);
      book.categories = categories;

      setBookData(book);
      setIsLoading(false);
    })();
  }, [id]);

  const {
    authors = ['N/A'], // ["string"]
    averageRating = 'N/A', // number 1-5
    ratingsCount = 'N/A', // number
    categories = ['N/A'], // ["string"]
    description = 'N/A', // 'string'
    imageLinks, // {'smallThumbnail', 'thumbnail', 'small', 'medium', large', 'extraLarge'}
    pageCount = 'N/A', // number
    previewLink = 'N/A', // 'string'
    publishedDate = 'N/A', // 'string' - '2016-07-31'
    publisher = 'N/A', // 'string'
    title = 'N/A' // 'string'
  } = bookData;

  let image;
  if (imageLinks) {
    const { medium, small, thumbnail, smallThumbnail } = imageLinks;

    image = medium || small || thumbnail || smallThumbnail;
  } else {
    image = notfound;
  }

  return (
    <>
      {!isLoading && (
        <>
          <Banner image={image} />
          <Container>
            <BookInfo>
              <Left>
                <Image src={image} alt='book cover' />
                <Categories>
                  Categories:
                  {categories.map((category, i) => (
                    <CategoryName key={i}>{category}</CategoryName>
                  ))}
                </Categories>
              </Left>
              <Right>
                <RightTop>
                  <Title>{title}</Title>
                  <Authors>
                    by{' '}
                    {authors.map((author, i) => (
                      <AuthorName key={i}>{author}</AuthorName>
                    ))}
                  </Authors>
                  <BookType>Book</BookType>
                </RightTop>
                <RightBottom>
                  <Publisher>Published by: {publisher}</Publisher>
                  <AverageRating>Average rating: {averageRating}</AverageRating>
                  <RatingsCount>Number of ratings: {ratingsCount}</RatingsCount>
                  <PageCount>Pages: {pageCount}</PageCount>
                  <PublishedDate>Published on: {publishedDate}</PublishedDate>
                  <Description description={description} />
                  <PreviewLink>
                    <a
                      href={previewLink}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      Preview on google books
                    </a>
                  </PreviewLink>
                  <span>id: {id}</span>
                </RightBottom>
              </Right>
            </BookInfo>
          </Container>
        </>
      )}
    </>
  );
};

export default BookView;
