import { useEffect, useState } from 'react';
import { Alert, Skeleton } from 'antd';
import useData from '@/hooks/useData';

export const AlertActiveAccount = ({ userId }) => {
	const [endpointActiveAccount, setEndpointActiveAccount] = useState();
	const [errorActive, loadingActive, isActive] = useData(endpointActiveAccount);

	useEffect(() => {
		if (userId) setEndpointActiveAccount(`/active-account/${userId}`);
		//? Hace un toast headless
	}, []);

	if (!userId) return null;

	if (errorActive && !loadingActive)
		return (
			<Alert
				message='Hubo un error al activar la cuenta'
				//description='El enlace no es válido o está vencido'
				type='error'
				showIcon
				closable
				style={{ width: 400 }}
			/>
		);

	if (loadingActive) return  <Skeleton.Input active={loadingActive} size='small' style={{ width: 400 }} />;

	if (!errorActive && !loadingActive && isActive)
		return (
			<Alert
				message='La cuenta fue activada'
				//description='Ahora ya puedes iniciar sesión en nuestro sitio'
				type='success'
				showIcon
				closable
				style={{ width: 400 }}
			/>
		);
};
