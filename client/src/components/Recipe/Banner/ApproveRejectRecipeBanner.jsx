import { Button } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import { ModalRejectRecipes } from '@/components/AdminDashboard/RecipesAdmin/ModalRejectRecipes';
import { useChangeStateRecipe } from '@/services/queries/recipeQueries';

import styles from './RecipeAlert.module.css';

export const ApproveRejectRecipeBanner = ({ recipeId }) => {
	const { isPending, mutate } = useChangeStateRecipe();

	const approveRecipe = () => {
		mutate({ recipeId, state: 'success' });
	};

	return (
		<div className={styles.bannerContainer}>
			<div className={styles.mainInfo}>
				<div className={styles.iconDerivar}>
					<CheckCircleFilled style={{ fontSize: 25 }} />
				</div>

				<div className={styles.content}>
					<h4 className={styles.title}>Receta pendiente de aprobar</h4>{' '}
					<div className={styles.subtitle}>
						Al aprobar la receta aparecerá visible para todos los usuarios
					</div>
				</div>
			</div>

			<div className={styles.btnGroup}>
				<ModalRejectRecipes recipeId={recipeId} size='middle' />
				<Button
					loading={isPending}
					onClick={approveRecipe}
					className='success-dark'>
					Aprobar
				</Button>
			</div>
		</div>
	);
};
