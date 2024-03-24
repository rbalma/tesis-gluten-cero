import styles from './CategoryItem.module.css';

export const CategoryItem = ({ name, icon, onChange }) => {
	return (
		<label htmlFor={name} className={styles.radioButton}>
			<input
				type='radio'
				name='radio-card'
				id={name}
				value={name}
				onChange={(e) => {
					onChange(e.target.value);
				}}
			/>
			<div className={styles.contentWrapper}>
				<span className={styles.checkIcon}></span>
				<div className={styles.radioContent}>
					{icon}
					<h4>{name}</h4>
				</div>
			</div>
		</label>
	);
};
