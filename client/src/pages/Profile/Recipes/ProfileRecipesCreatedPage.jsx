import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { IconChevronDown } from '@/components/Icons';
import { ProfileRecipeCard } from '@/components/Profile/Cards';

import styles from './ProfileRecipe.module.css';

export const ProfileRecipesCreatedPage = () => {
	return (
		<div className={styles.profileContainer}>
		<header className={styles.profileHeader}>
			<h1>Mis recetas</h1>
			<Breadcrumb
				className={styles.profileBreadcrumb}
				separator={<IconChevronDown size={16} />}>
				<Breadcrumb.Item>
					<Link to='/'>Inicio</Link>
				</Breadcrumb.Item>
				<Breadcrumb.Item>Recetas Publicadas</Breadcrumb.Item>
			</Breadcrumb>
		</header>

		{/* <Row justify='space-between' wrap>
			<Button>Publicar receta</Button>
			<Select
				defaultValue='lucy'
				bordered={false}
				options={[
					{
						value: 'jack',
						label: 'Más antiguos',
					},
					{
						value: 'lucy',
						label: 'Más recientes',
					},
				]}
			/>
		</Row> */}

		<div className={styles.recipesList}>
			<ProfileRecipeCard isEdit />
			<ProfileRecipeCard isEdit />
		</div>
	</div>);
};

