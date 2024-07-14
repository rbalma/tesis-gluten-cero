import { CheckmarkIcon } from './Checkmark/CheckmarkIcon';
import styles from './SuccessMessageForm.module.css';

export const SuccessMessageForm = ({ children }) => {
	return (
		<div className={styles.containerSuccessRecipe}>
			<CheckmarkIcon />
			{children}
		</div>
	);
};
