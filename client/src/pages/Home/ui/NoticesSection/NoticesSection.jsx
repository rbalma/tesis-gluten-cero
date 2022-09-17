import useData from "@/hooks/useData";
import { Result } from "antd";

import styles from './NoticesSection.module.css';
import { NoticesSlider } from "./NoticesSlider";

export const NoticesSection = () => {
const { 1: loading, 2: notices } = useData('/notices?limit=10&page=1');

	return (
		<section className={styles.container}>
			<h4 className={styles.title}>Últimas Noticias</h4>
			{ !loading && notices?.length === 0 ? (
				<Result
					status='404'
					subTitle='Disculpe pero en este momento no existen noticias.'
				/>
			) : (
				<NoticesSlider notices={notices} />
			)}
		</section>
	);
};
