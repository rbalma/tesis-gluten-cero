import { useEffect, useState } from 'react';
import { Alert, Skeleton } from 'antd';
import axiosInstance from '@/utils/axiosInstance';
import useCrud from '@/hooks/useCrud';

export const AlertActiveAccount = ({ userId }) => {
	const { 0: isLoading, 3: activeUser } = useCrud('/active-account');
	const [isSuccess, setIsSuccess] = useState(false);
	const [isError, setIsError] = useState('');

	useEffect(() => {
		const handleActiveUser = async (userId) => {
			const data = await activeUser(userId);
			if (data?.ok) setIsSuccess(true);
			if (data?.error) setIsError(data.error);
		};

		if (userId) handleActiveUser(userId);
	}, []);

	if (!userId) return null;
	
	if (isLoading) return  <Skeleton.Input active={isLoading} size='small' style={{ width: 400 }} />;

	if (!isLoading && isError)
		return (
			<Alert
				message='Hubo un error al activar la cuenta'
				description={isError}
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
