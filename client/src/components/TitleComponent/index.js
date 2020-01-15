import React from 'react';
import Helmet from 'react-helmet';

const TitleComponent = ({ title }) => {
  let defaultTitle = 'Book Search';
  return (
    <Helmet>
      <title>{title ? title : defaultTitle}</title>
    </Helmet>
  );
};

export default TitleComponent;
