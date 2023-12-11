import notFound from '@/assets/images/notices-not-found.gif';
import useData from "@/hooks/useData";

import styles from './NoticesSection.module.css';
import NoticeCarousel from './NoticeCarousel';



export const NoticesSection = () => {
	const { 1: loading, 2: notices } = useData('/notices?limit=10&page=1');
	console.log(notices)
	if(loading) return <h1>Cargando...</h1>

	return (
		<section className={styles.container}>
			<h4 className={styles.title}>Últimas Noticias</h4>
			{ !loading && notices?.length === 0 ? (
				<>
				<img
					src={notFound}
					alt='no-existen-noticias'
					width={300}
				/>
				<p className={styles.notFound}>Disculpe pero en este momento no existen noticias</p>
				</>
			) : (
				// <NoticesSlider notices={notices} />
				// <Carousel autoplay>
				// 	{notices.map((notice)=>(
				// 		<NoticeCard key={notice._id} notice={notice}/>
				// 	))}
				// </Carousel>
				<div className={styles.carouselContainer}>
					<NoticeCarousel notices={notices}/>
				</div>
			)}
		</section>
	);
};
