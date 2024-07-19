import { Link, Navigate } from 'react-router-dom';
import { ApproveRejectRecipeBanner } from '../Banner/ApproveRejectRecipeBanner';
import { RejectRecipeAlert } from '../Banner/RejectRecipeAlert';
import useAuthStore from '@/store/authStore';

import styles from './CardRecipeDetail.module.css';

export const CardHeaderRecipeDetail = ({ recipeId, title, category, state, userId }) => {
	const userAuth = useAuthStore((state) => state.userProfile);

	if ((state === 'pending' && userAuth?.role !== 'admin'))
		return <Navigate to='/recetas' />;

	if (
		(state ===
			'error' &&
			(!userAuth?.id || (userAuth?.role === 'user' && userAuth?.id !== userId)))
	)
		return <Navigate to='/recetas' />;

	return (
		<header className={styles.headerRecipeDetail}>
			{state === 'pending' ? <ApproveRejectRecipeBanner recipeId={recipeId}  /> : null}
			{state === 'error' ? <RejectRecipeAlert recipeId={recipeId} /> : null}
			<h1>{title}</h1>
			<span className={styles.linesCategory}>
				<span>
					<Link to='/recetas'>{category}</Link>
				</span>
			</span>
		</header>
	);
};
