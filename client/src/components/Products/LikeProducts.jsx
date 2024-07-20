import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@/store/authStore';
import { useLikeProduct } from '@/services/queries/productsQueries';
import { IconHeart, IconHeartFilled } from '../Icons';

import styles from './FiltersProducts.module.css';

export const LikeProducts = ({ productId, count }) => {
	const navigate = useNavigate();
  const userAuth = useAuthStore((state) => state.userProfile);
	const [fav, setFav] = useState(false);
	const { mutateAsync } = useLikeProduct();

	useEffect(() => {
		if (userAuth?.favProducts?.some((favProductId) => favProductId === productId))
			setFav(true);
	}, []);

	const addFav = async () => {
		const stateInitials = fav;

		if (!userAuth?.id) return navigate('/ingreso');
		
    setFav(() => !fav);

		try {
			await mutateAsync({ productId, isLiked: !stateInitials });
		} catch (error) {
			console.log(error);
			setFav(stateInitials);
		}
	};

	return (
		<div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
			<span
				className={`${styles.likeProduct} ${fav && styles.likeProductActive}`}
				onClick={addFav}>
				{!fav ? <IconHeart size={18} /> : <IconHeartFilled size={18} />}
			</span>
			<span>{count}</span>
		</div>
	);
};
