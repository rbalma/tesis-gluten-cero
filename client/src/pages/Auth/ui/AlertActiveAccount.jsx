import { useEffect, useState } from 'react';
import { Alert, Skeleton } from 'antd';

import useCrud from '@/hooks/useCrud';
import axiosInstance from '@/utils/axiosInstance';

export const AlertActiveAccount = ({ userId }) => {
	const { 0: loadingActive, 3: putActive } = useCrud('/active-account');
	const [isSuccess, setIsSuccess] = useState(false);
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {

		const handleActiveUser = async (userId) => {
			try {
				const { data } = await axiosInstance.put(`/active-account/${userId}`);
				if (data.ok) setIsSuccess(true);
			} catch (error) { 
				setIsError(true)
			} finally {
				setIsLoading(false);
			}
		}

		if (userId) handleActiveUser(userId);

	}, []);

	if (!userId) return null;
	
	if (isLoading) return  <Skeleton.Input active={isLoading} size='small' style={{ width: 400 }} />;

	if (!isLoading && isError)
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


	if (!isLoading && isSuccess)
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
