import React, { useState } from 'react';
import { RightCircleTwoTone , LeftCircleTwoTone } from '@ant-design/icons';
import Slider from "react-slick";
import { NoticesCard } from './NoticesCard';


import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import styles from './NoticesSlider.module.css';

export const NoticesSlider = ({ notices }) => {

  const settings = {
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: true,
    nextArrow: <SlickArrowRight />,
    prevArrow: <SlickArrowLeft />,
    responsive: [
      {
        breakpoint: 576,
        settings: { slidesToShow: 1, initialSlide: 0 }
      },
      {
        breakpoint: 992,
        settings: { slidesToShow: 2, initialSlide: 0 }
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
                <NoticesCard key={i} notice={ notice } />
            ))
          }
        </Slider>
    </div>
  )
}

//* Botones flechas
const SlickArrowLeft = ({ onClick }) => (
  <div className={`${styles.arrow} ${styles.prev}`} onClick={ onClick } >
    <LeftCircleTwoTone twoToneColor="#0D58BA" />
  </div>
);
const SlickArrowRight = ({ onClick }) => (
  <div className={`${styles.arrow} ${styles.next}`}  onClick={ onClick } >
   <RightCircleTwoTone twoToneColor="#0D58BA" />
  </div>
);