import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ColorThief from 'colorthief';

const PreloadImage = ({ image, setColor }) => {
  const location = useLocation();

  useEffect(() => {
    let img = new Image();
    img.onload = function() {
      console.log('image loaded!');
      OnImageLoaded(this);
    };

    // https://stackoverflow.com/questions/23609946/img-src-path-with-header-params-to-pass
    const src = `https://cors-anywhere.herokuapp.com/${image}`;
    const options = {
      headers: {
        Origin: location
      }
    };

    fetch(src, options)
      .then(res => res.blob())
      .then(blob => {
        img.src = URL.createObjectURL(blob);
      });
  }, [image]);

  function OnImageLoaded(img) {
    const colorThief = new ColorThief();
    let color = colorThief.getColor(img);
    setColor(color.join(', '));
    console.log('color: ' + color);
  }

  return <></>;
};

export default PreloadImage;
