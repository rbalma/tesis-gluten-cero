import React, { useState } from 'react';
import { CaretRightOutlined , CaretLeftOutlined } from '@ant-design/icons';
import Slider from "react-slick";
import { NoticesCard } from './NoticesCard';

import styles from './NoticesSlider.module.css';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export const NoticesSlider = ({ notices }) => {
  const [imageIndex, setImageIndex] = useState(0);

  const settings = {
    infinite: true,
    speed: 800,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    dots: true,
    nextArrow: <SlickArrowRight />,
    prevArrow: <SlickArrowLeft />,
    beforeChange: (_, next) => setImageIndex(next),
    responsive: [
      {
        breakpoint: 576,
        settings: { slidesToShow: 1, initialSlide: 0, arrows: false, centerMode: false}
      },
      {
        breakpoint: 992,
        settings: { slidesToShow: 2, initialSlide: 0, centerMode: false, }
      },
      {
        breakpoint: 1600,
        settings: { slidesToShow: 3, initialSlide: 0 }
      }
    ]
  };
  

  return (
    <div className={styles.sliderReact} >
    <Slider {...settings}>
          {
            notices.map((notice, i) => (
              <div key={i} className={i === imageIndex ? `${styles.slide} ${styles.activeSlide}` : `${styles.slide}`} >
                <NoticesCard notice={ notice } />
              </div>
            ))
          }
        </Slider>
    </div>
  )
}

//* Botones flechas
const SlickArrowLeft = ({ onClick }) => (
  <div className={`${styles.arrow} ${styles.prev}`} onClick={ onClick } >
    <CaretLeftOutlined />
  </div>
);
const SlickArrowRight = ({ onClick }) => (
  <div className={`${styles.arrow} ${styles.next}`}  onClick={ onClick } >
   <CaretRightOutlined />
  </div>
);