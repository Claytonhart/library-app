import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components/macro';

import AuthorName from './AuthorName';
import Description from './Description';
import notfound from 'assets/images/notfound.svg';
import { parseCategories } from 'utils/parseCategories';
import OverFlowHidden from 'components/OverFlowHidden';

const Container = styled.div`
  max-width: 1200px;
  margin: 100px auto;
`;

const Banner = styled.div`
  /* https://stackoverflow.com/questions/15852122/hex-transparency-in-colors/17239853#17239853 */
  /* black rgb(18, 19, 15) */
  background-image: linear-gradient(
      to bottom,
      rgba(18, 19, 15, 0.9),
      rgba(18, 19, 15, 0.5)
    ),
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
  padding: 20px;
`;
const Right = styled.div`
  flex: 1;
  margin-top: 50px;
  overflow: hidden;
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
  padding-top: 20px;
`;

const AddToList = styled.button`
  padding: 12px 24px;
  border: 1px solid ${props => props.theme.primary.lightblue};
  color: ${props => props.theme.primary.lightblue};
  cursor: pointer;
  transition: all 0.2s ease-in;
  margin-bottom: 20px;

  &:hover {
    background-color: ${props => props.theme.primary.lightblue};
    color: #fff;
  }
`;

const Title = styled.h1`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Authors = styled.div``;

const BookType = styled.p``;
const AverageRating = styled.div``;
const RatingsCount = styled.div``;
const Categories = styled.div`
  margin-top: 10px;
  color: ${props => props.theme.primary.lightblue};
`;
const CategoryName = styled.p``;

const Image = styled.img`
  max-width: 90%;
  min-height: 300px;
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
                <OverFlowHidden height={'100'}>
                  <Categories>
                    Categories:
                    {categories.map((category, i) => (
                      <CategoryName key={i}>{category}</CategoryName>
                    ))}
                  </Categories>
                </OverFlowHidden>
              </Left>
              <Right>
                <RightTop>
                  <Title>{title}</Title>
                  <Authors>
                    by{' '}
                    {authors.map((author, i) => (
                      <AuthorName
                        key={i}
                        author={author}
                        addComma={i < authors.length - 1 ? true : false}
                      />
                    ))}
                  </Authors>
                  <BookType>Book</BookType>
                </RightTop>
                <RightBottom>
                  <AddToList>Add To My Booklist</AddToList>
                  <Description description={description} />
                  <Publisher>Published by: {publisher}</Publisher>
                  <AverageRating>Average rating: {averageRating}</AverageRating>
                  <RatingsCount>Number of ratings: {ratingsCount}</RatingsCount>
                  <PageCount>Pages: {pageCount}</PageCount>
                  <PublishedDate>Published on: {publishedDate}</PublishedDate>
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
