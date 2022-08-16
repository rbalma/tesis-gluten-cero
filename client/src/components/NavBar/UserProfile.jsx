import { useEffect, useState } from 'react';
import { Avatar, Menu, Dropdown } from 'antd';
import {
	IdcardFilled,
	SettingFilled,
	LockFilled,
	LogoutOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

export const UserProfile = ({ user }) => {
	const { id, role } = user;
	const [avatar, setAvatar] = useState('');

	useEffect(() => {
		if (user?.avatar) {
			setAvatar(server + user.avatarUrl);
		}
		if (user?.google) {
			setAvatar(user.avatarUrl);
		}
	}, [user]);

	const logoutUser = () => {
		logout();
		window.location.href = '/';
	};

	const menuPerfil = (
		<Menu style={{ fontFamily: 'Sora, Verdana' }}>
			<Menu.Item key='1' icon={<IdcardFilled />}>
				<Link to={`/perfil/${id}`}>Perfil</Link>
			</Menu.Item>
			<Menu.Item key='2' icon={<SettingFilled />}>
				<Link to={`/perfil/${id}/configuracion/datos`}>Configuración</Link>
			</Menu.Item>

			{role === 'admin' && (
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
			placement='bottomCenter'
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
