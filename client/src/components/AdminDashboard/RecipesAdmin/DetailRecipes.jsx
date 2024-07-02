import { Avatar, Button } from 'antd';
import { SkeletonDetails } from '../Skeleton/SkeletonDetails';
import { ModalDeleteRecipes } from './ModalDeleteRecipes';
import { useNavigate } from 'react-router-dom';
import { ModalApproveRecipes } from './ModalApproveRecipes';
import { ModalRejectRecipes } from './ModalRejectRecipes';
import { useGetRecipeById } from '@/services/queries/recipeQueries';
import { IconExternalLink, IconStar } from '@/components/Icons';
import { dateLongFormat } from '@/utils/format';
import { TagStateRecipe } from '../TagStateRecipe';

import styles from './DetailRecipes.module.css';

export const DetailRecipes = ({ recipeId, onCloseDrawer }) => {
	const navigate = useNavigate();
	const { isFetching, data } = useGetRecipeById(recipeId);

	if (isFetching) return <SkeletonDetails />;

	return (
		<>
			<div className={styles.pictureInfo}>
				<Avatar
					src={data.image.secure_url}
					alt='recipe'
					shape='square'
					size={180}
				/>
			</div>

			<div className={styles.bodyInfo}>
				<h2>{data.title}</h2>

				<div className={styles.itemInfo}>
					Categoría:{' '}
					<span className={styles.itemData}>{data.category.name}</span>
				</div>

				<div className={styles.itemInfo}>
					Tiempo preparación:{' '}
					<span className={styles.itemData}>
						{data.preparationTime} minutos
					</span>
				</div>

				<div className={styles.itemInfo}>
					Rendimiento:{' '}
					<span className={styles.itemData}>{data.performance} porciones</span>
				</div>

				<div className={styles.itemListInfo}>
					Ingredientes: <br />
					<ul>
						{data.ingredients.map((ingredient) => (
							<li key={ingredient}>{ingredient}</li>
						))}
					</ul>
				</div>

				<div className={styles.itemListInfo}>
					Procedimiento: <br />
					<ol>
						{data.instructions.map((instruction) => (
							<li key={instruction}>{instruction}</li>
						))}
					</ol>
				</div>

				<div className={styles.itemInfo}>
					Fecha de creación:{' '}
					<span className={styles.itemData}>
						{dateLongFormat(data.createdAt)}
						{data.isUpdated
							? ` (Actualizada el ${dateLongFormat(data.updatedAt)})`
							: null}
					</span>
				</div>

				<div className={styles.itemInfo}>
					Creada por:{' '}
					<span className={styles.itemData}>
						{`${data.user?.name} ${data.user?.lastname}`}
					</span>
				</div>

				<div className={styles.itemInfo}>
					Puntaje:{' '}
					<span className={styles.itemData}>
						{data.ratingAverage.$numberDecimal} <IconStar size={14} /> (
						{data.ratingCount})
					</span>
				</div>

				<div className={styles.itemInfo}>
					Estado:{' '}
					<span className={styles.itemData}>
						<TagStateRecipe state={data.state} />
					</span>
				</div>
			</div>

			<div className={styles.btnRow}>
				<ModalDeleteRecipes
					recipeId={recipeId}
					recipeName={data.title}
					onCloseDrawerDetail={onCloseDrawer}
				/>

				{data.state === 'pending' ? (
					<Button
						size='small'
						className='iconBtn'
						onClick={() => navigate(`/recetas/${recipeId}`)}
						icon={<IconExternalLink size={16} />}>
						Detalle
					</Button>
				) : null}

				{data.state === 'error' ? (
					<ModalApproveRecipes
						recipeId={recipeId}
						recipeName={data.title}
						onCloseDrawerDetail={onCloseDrawer}
					/>
				) : null}

				{data.state === 'success' ? (
					<ModalRejectRecipes
						recipeId={recipeId}
						onCloseDrawerDetail={onCloseDrawer}
					/>
				) : null}

			</div>
		</>
	);
};
