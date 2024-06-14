import { categoryGetImage } from '@/utils/fetchData';
import styles from './CategoryItem.module.css';

export const CategoryItem = ({ id, name, image, onChange }) => {
	return (
		<label htmlFor={id} className={styles.radioButton}>
			<input
				type='radio'
				name='radio-card'
				id={id}
				value={id}
				onChange={(e) => {
					onChange(e.target.value);
				}}
			/>
			<div className={styles.contentWrapper}>
				<span className={styles.checkIcon}></span>
				<div className={styles.radioContent}>
					<img alt='category' src={categoryGetImage(image)}/>
					<h4>{name}</h4>
				</div>
			</div>
		</label>
	);
};
