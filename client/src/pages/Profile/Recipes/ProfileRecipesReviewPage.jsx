import { useState } from 'react';
import { Breadcrumb, Select, Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import useAuthStore from '@/store/authStore';
import { IconChevronDown } from '@/components/Icons';
import { ProfileRecipeReviewCard } from '@/components/Profile/Cards';
import { useGetReviewsRecipeByUser, useGetReviewsRecipeFromUsers } from '@/services/queries/reviewsQueries';

import styles from './ProfileRecipe.module.css';

const options = {
	0: {
		withReply: '0',
		withoutReply: '0',
	},
	1: {
		withReply: '1',
		withoutReply: '0',
	},
	2: {
		withReply: '0',
		withoutReply: '1',
	},
};

export const ProfileRecipesReviewPage = () => {
	const userProfile = useAuthStore((state) => state.userProfile);
	const [filters, setFilters] = useState({
		withReply: '0',
		withoutReply: '0',
	});
	const { isSuccess, isFetching, data } = useGetReviewsRecipeFromUsers({
		userId: userProfile.id,
		filters,
	});
	const reviewsByUser = useGetReviewsRecipeByUser(
		userProfile.id,
	);

	const onChangeFilters = (value) => {
		setFilters(options[value]);
	};

	return (
		<div className={styles.profileContainer}>
			<header className={styles.profileHeader}>
				<h1>Reseñas de Recetas</h1>
				<Breadcrumb
					className={styles.profileBreadcrumb}
					separator={<IconChevronDown size={16} />}>
					<Breadcrumb.Item>
						<Link to='/'>Inicio</Link>
					</Breadcrumb.Item>
					{/* //! Agregar ID del usuario logueado a la url */}
					<Breadcrumb.Item>
						<Link to='/perfil/632298b7f462f1ba1974d3b6/recetas'>Recetas</Link>
					</Breadcrumb.Item>
					<Breadcrumb.Item>Reseñas</Breadcrumb.Item>
				</Breadcrumb>
			</header>

			<div className={styles.profileRecipeReviewGrid}>
				<section className={styles.recipesList}>
					<div className={styles.recipesListHeader}>
						Reseñas de los Usuarios
						<Select
							defaultValue={0}
							bordered={false}
							size='small'
							dropdownStyle={{ minWidth: 130 }}
							placement='bottomLeft'
							onSelect={onChangeFilters}
							options={[
								{
									value: 0,
									label: 'Todas',
								},
								{
									value: 1,
									label: 'Respondida',
								},
								{
									value: 2,
									label: 'Sin Responder',
								},
							]}
						/>
					</div>
					{isFetching ? (
						<Skeleton.Input
							active={true}
							block={true}
							style={{ height: 250 }}
						/>
					) : null}
					{isSuccess && !isFetching
						? data.reviews.map((review) => (
								<ProfileRecipeReviewCard
									key={review._id}
									isUserRecipe
									{...review}
								/>
						  ))
						: null}
				</section>
				<section className={styles.recipesList}>
					<div className={styles.recipesListHeader}>Mis Reseñas</div>
					{reviewsByUser.isFetching ? (
						<Skeleton.Input
							active={true}
							block={true}
							style={{ height: 250 }}
						/>
					) : null}
					{reviewsByUser.isSuccess && !reviewsByUser.isFetching
						? reviewsByUser.data.reviews.map((review) => (
								<ProfileRecipeReviewCard
									key={review._id}
									{...review}
								/>
						  ))
						: null}
				</section>
			</div>
		</div>
	);
};
