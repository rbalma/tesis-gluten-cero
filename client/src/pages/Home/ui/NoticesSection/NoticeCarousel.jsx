import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { format } from 'date-fns'
import ESLocale from 'date-fns/locale/es';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import './NoticeCarousel.css';

const getImageURL = (notice) => {
  const bufferArray = notice.avatar?.data.data;

  if(!bufferArray) return;
				
  const buffer = Uint8Array.from(bufferArray);

  const blob = new Blob([buffer], { type: notice.avatar.contentType });

  const imageUrl = URL.createObjectURL(blob);

  return imageUrl;
}

const CardNotice = ({notice}) => {
  return(
    <div className='card-notice'>
      <img 
        className='card-notice-image'
        src={getImageURL(notice)}
        alt='Imagen noticia'
      />
      <div className='card-notice-source'>{notice.source}</div>
      <div className='card-notice-info'>
        <div className='card-notice-info__title'>{notice.title}</div>
        <div className='card-notice-info__actions'>
          <div className='card-notice-info__date'>{format(new Date(notice.date), 'PPP', { locale: ESLocale })}</div>
          <button className='card-notice-info__btn' onClick={()=>window.open(notice.link,'_blank')}>Ver más</button>
        </div>
      </div>
    </div>
  )
}

export default function NoticeCarousel({ notices }) {
  return(
    <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2,
          slideShadows: false,
        }}
        // autoplay={{
        //   delay: 5000,
        //   disableOnInteraction: false,
        // }}
        loop={true}
        modules={[Autoplay, EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {notices.concat(notices).map((notice, index) => (
          <SwiperSlide key={index}>
            <CardNotice notice={notice}/>
          </SwiperSlide>
        ))}
      </Swiper>
  );
};
