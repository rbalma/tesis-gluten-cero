import NoticeCarousel from './NoticeCarousel';
import notFound from '@/assets/images/notices-not-found.gif';
import { useGetNotices } from '@/services/queries/noticeQueries';
import { Slide } from 'react-awesome-reveal';

import styles from './NoticesSection.module.css';

export const NoticesSection = () => {
	const { isFetching, data } = useGetNotices();

	if (isFetching) return <h1>Cargando...</h1>;

	return (
		<section className={styles.container} id='noticias'>
			<Slide direction='left' triggerOnce>
				<h4 className={styles.title}>
					Últimas <span>Noticias</span>
				</h4>
			</Slide>
			{!isFetching && data?.notices?.length === 0 ? (
				<>
					<img src={notFound} alt='no-existen-noticias' width={300} />
					<p className={styles.notFound}>
						Disculpe pero en este momento no existen noticias
					</p>
				</>
			) : (
				<div className={styles.carouselContainer}>
					<NoticeCarousel notices={data?.notices} />
				</div>
			)}
		</section>
	);
};
