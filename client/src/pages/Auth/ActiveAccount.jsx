import { useEffect } from 'react';
import { IconCircleCheck, IconExclamationCircle } from '@/components/Icons';
import { Link, useParams } from 'react-router-dom';
import { useChangeStatusUser } from '@/services/queries/usersQueries';

import styles from './ActiveAccount.module.css';

export const ActiveAccount = () => {
	const { id } = useParams();
	const { mutate, isSuccess, isError, isPending } = useChangeStatusUser();

	useEffect(() => {
		mutate({ userId: id, values: { active: true } });
	}, []);

	if (isPending) return null;

	return (
		<div className={styles.containerAccount}>
			<div className={styles.horizontalBar} />
			<div className={styles.boxInfo}>
				<div className={styles.bgIcon}>
					{isSuccess && <IconCircleCheck size={70} />}
					{isError && <IconExclamationCircle size={70} />}
				</div>

				{isSuccess && <h2>Tu cuenta fue activada con éxito</h2>}
				{isError && <h2>No se pudo activar tu cuenta</h2>}

				{isSuccess && (
					<p>
						Ya puedes iniciar sesión en{' '}
						<Link target='_blank' to='/ingreso'>
							Gluten Cero
						</Link>
					</p>
				)}

				{isError && <p>Vuelve a intentarlo</p>}
			</div>
		</div>
	);
};
