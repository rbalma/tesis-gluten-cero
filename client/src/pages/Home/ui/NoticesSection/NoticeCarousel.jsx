import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import './NoticeCarousel.css';
import { noticeGetImage } from '@/utils/fetchData';
import { dateFormat } from '@/utils/format';

const CardNotice = ({notice}) => {
  return(
    <div className='card-notice'>
      <img 
        className='card-notice-image'
        src={noticeGetImage(notice.image)}
        alt='Imagen noticia'
      />
      <div className='card-notice-source'>{notice.source}</div>
      <div className='card-notice-info'>
        <div className='card-notice-info__title'>{notice.title}</div>
        <div className='card-notice-info__actions'>
          <div className='card-notice-info__date'>{dateFormat(notice.date)}</div>
          <a href={notice.link} target='_blank' className='card-notice-info__btn'>Ver más</a>
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
        {notices.map((notice, index) => (
          <SwiperSlide key={index}>
            <CardNotice notice={notice}/>
          </SwiperSlide>
        ))}
      </Swiper>
  );
};
