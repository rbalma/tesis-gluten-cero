import { useEffect, useState } from 'react';
import { Avatar, Menu, Dropdown } from 'antd';
import {
	IdcardFilled,
	SettingFilled,
	LockFilled,
	LogoutOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import useAuthStore from '@/store/authStore';

export const UserProfile = () => {
	const {
		userProfile: user,
		removeUser,
	} = useAuthStore();
	const [avatar, setAvatar] = useState('');

	useEffect(() => {
		if (user?.avatar) {
			setAvatar(import.meta.env.VITE_API_URL + user.avatarUrl);
		}
		if (user?.google) {
			setAvatar(user.avatarUrl);
		}
	}, [user]);

	const logoutUser = () => {
		removeUser();
	};

	const menuPerfil = (
		<Menu style={{ fontFamily: 'Sora, Verdana' }}>
			<Menu.Item key='1' icon={<IdcardFilled />}>
				<Link to={`/perfil/${user.id}`}>Perfil</Link>
			</Menu.Item>
			<Menu.Item key='2' icon={<SettingFilled />}>
				<Link to={`/perfil/${user.id}/configuracion/datos`}>Configuración</Link>
			</Menu.Item>

			{user.role === 'admin' && (
				<Menu.Item key='4' icon={<LockFilled />}>
					<Link to='/admin'>Panel Admin</Link>
				</Menu.Item>
			)}

			<Menu.Divider />
			<Menu.Item key='3' onClick={logoutUser} danger icon={<LogoutOutlined />}>
				Cerrar Sesión
			</Menu.Item>
		</Menu>
	);

	return (
		<Dropdown
			overlay={menuPerfil}
			trigger={['click']}
			placement='bottom'
			arrow
		>
			<Avatar
				style={{ cursor: 'pointer' }}
				src={avatar || user.dicebear}
				size='large'
			/>
		</Dropdown>
	);
};
