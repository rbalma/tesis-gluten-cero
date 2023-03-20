import { useEffect, useMemo, useState } from 'react';
import { Avatar, Menu, Dropdown } from 'antd';
import {
	IdcardFilled,
	SettingFilled,
	LockFilled,
	LogoutOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '@/store/authStore';
import { userGetAvatar } from '@/utils/fetchData';

export const UserProfile = () => {
	const { userProfile: user, removeUser } = useAuthStore();
	const navigate = useNavigate();
	const [avatar, setAvatar] = useState('');

	useEffect(() => {
		if (user?.avatar) {
			return setAvatar(userGetAvatar(user.avatar));
		}
		if (user?.google) {
			return setAvatar(user.avatar);
		}

		setAvatar(user?.dicebear);
	}, [user]);

	const logoutUser = () => {
		removeUser();
		navigate('/');
	};

	const menuPerfil = useMemo(
		() => [
			{
				key: '01',
				label: <Link to={`/perfil/${user.id}`}>Perfil</Link>,
				icon: <IdcardFilled />,
			},
			{
				key: '02',
				label: (
					<Link to={`/perfil/${user.id}/panel/configuracion`}>
						Configuración
					</Link>
				),
				icon: <SettingFilled />,
			},
			user.role === 'admin' && {
				key: '04',
				label: <Link to='/admin'>Panel Admin</Link>,
				icon: <LockFilled />,
			},
			{
				type: 'divider',
			},
			{
				key: '03',
				label: <div onClick={logoutUser}>Cerrar Sesión</div>,
				icon: <LogoutOutlined />,
				danger: true,
			},
		],
		[]
	);

	return (
		<Dropdown
			overlay={
				<Menu style={{ fontFamily: 'Sora, Verdana' }} items={menuPerfil} />
			}
			trigger={['click']}
			placement='bottom'
			arrow
		>
			<Avatar
				style={{ cursor: 'pointer' }}
				src={avatar}
				size='large'
			/>
		</Dropdown>
	);
};
