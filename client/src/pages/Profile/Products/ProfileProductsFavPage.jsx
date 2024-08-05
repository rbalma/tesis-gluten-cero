import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { IconChevronDown } from '@/components/Icons';
import { ProfileProductsFavCard } from '@/components/Profile/Cards';
import { useGetProductsByUser } from '@/services/queries/productsQueries';

import styles from './ProfileProducts.module.css';

export const ProfileProductsFavPage = () => {
	const { data, isLoading, isSuccess } = useGetProductsByUser();

	return (
		<div className={styles.profileContainer}>
			<header className={styles.profileHeader}>
				<h1>Productos Favoritos</h1>
				<Breadcrumb
					className={styles.profileBreadcrumb}
					separator={<IconChevronDown size={16} />}>
					<Breadcrumb.Item>
						<Link to='/'>Inicio</Link>
					</Breadcrumb.Item>
					<Breadcrumb.Item>
						<Link to='/productos'>Productos</Link>
					</Breadcrumb.Item>
					<Breadcrumb.Item>Favoritos</Breadcrumb.Item>
				</Breadcrumb>
			</header>

			<div className={styles.productsList}>
				{isSuccess && !isLoading
					? data.map((product) => (
							<ProfileProductsFavCard
								key={product._id}
								id={product._id}
								product={product.denominacionVenta}
								brand={product.marca}
							/>
					  ))
					: null}
			</div>
		</div>
	);
};
