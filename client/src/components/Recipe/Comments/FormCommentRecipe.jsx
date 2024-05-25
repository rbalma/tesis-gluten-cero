import { Button, Form, Input, Rate, Skeleton } from 'antd';
import useAuthStore from '@/store/authStore';
import {
	useCreateReviewRecipe,
	useHasReviewRecipe,
} from '@/services/queries/reviewsQueries';
import { AlertLoginRequired } from './AlertLoginRequired';
import { rules } from '@/utils/rulesForm';

import styles from './FormCommentRecipe.module.css';

export const FormCommentRecipe = ({ recetaId, userId }) => {
	const { userProfile } = useAuthStore();
	const { isLoading, isSuccess, isError, data } = useHasReviewRecipe({
		userId: userProfile?.id,
		recipeId: recetaId,
	});
	const { isPending, isSuccess: successReviewCreated, mutateAsync } = useCreateReviewRecipe();

	const addRecipeReview = async (values) => {
		try {
			values.recipe = recetaId;
			await mutateAsync(values);
		} catch (error) {
			console.log({ error });
		}
	};

	if (successReviewCreated) return null;

	if (!userProfile?.id) return <AlertLoginRequired />;

	if (isLoading)
		return (
			<Skeleton.Input active={true} block={true} style={{ height: 250 }} />
		);

	if (
		userProfile?.id === userId ||
		(userProfile?.id && isSuccess && data.hasReview)
	)
		return null;

	if (isError) return null;

	return (
		<div className={styles.formCommentContainer}>
			<div className={styles.headerFormComment}>
				<div className={styles.contentHeaderFormComment}>
					<h2>¿Te gustó la receta?</h2>
					<p>
						Deja una calificación de estrellas y una reseña en el siguiente
						formulario. Agradezo tus comentarios y que sirvan de ayuda a otros
					</p>
				</div>
			</div>

			<div className={styles.formCommentRecipe}>
				<Form onFinish={addRecipeReview}>
					<Form.Item
						name='rating'
						label='Calificación'
						style={{ marginBottom: 8 }}>
						<Rate />
					</Form.Item>
					<Form.Item name='content' rules={rules.message}>
						<Input.TextArea
							showCount
							maxLength={150}
							autoSize={{ minRows: 3 }}
							placeholder='Escribe tu reseña'
						/>
					</Form.Item>

					<Button
						htmlType='submit'
						className='btn-success'
						loading={isPending}
						shape='round'
						style={{ marginTop: 10 }}>
						Agregar Comentario
					</Button>
				</Form>
			</div>
		</div>
	);
};
