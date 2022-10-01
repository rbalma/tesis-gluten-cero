import { Avatar, Button, Menu, Dropdown } from 'antd';
import { UserOutlined, EllipsisOutlined } from '@ant-design/icons';

import styles from './CardPost.module.css';

const menu = (
	<Menu>
		<Menu.Item key='0'>
			<a href='https://www.antgroup.com'>Editar</a>
		</Menu.Item>
		<Menu.Item key='1'>
			<a href='https://www.aliyun.com'>Eliminar</a>
		</Menu.Item>
	</Menu>
);

export const CardPost = () => {
	return (
		<div className={styles.containerPost}>
			<div className={styles.cardUser}>
				<Avatar
					size={{ xs: 45, sm: 45, md: 45, lg: 45, xl: 70, xxl: 70 }}
					icon={<UserOutlined />}
				/>
				<p className={styles.nameUser}>Rodrigo Balmaceda</p>
				<span className={styles.typeUser}>ADMIN</span>
			</div>

			<div className={styles.cardData}>
				<div className={styles.cardDataHead}>
					<span>Posted November 16, 2005 (editado)</span>
					<Dropdown overlay={menu} trigger={['click']}>
						<Button type='dashed' icon={<EllipsisOutlined />}></Button>
					</Dropdown>
				</div>
				<div className={styles.cardDataBody}>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod
					deleniti dolorem aperiam id, neque nihil hic officiis a, ipsa dolores
					reiciendis unde quaerat. Cum dignissimos tenetur atque excepturi saepe
					similique. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
					Quod deleniti dolorem aperiam id, neque nihil hic officiis a, ipsa
					dolores reiciendis unde quaerat. Cum dignissimos tenetur atque
					excepturi saepe similique. Lorem ipsum dolor sit, amet consectetur
					adipisicing elit. Quod deleniti dolorem aperiam id, neque nihil hic
					officiis a, ipsa dolores reiciendis unde quaerat. Cum dignissimos
					tenetur atque excepturi saepe similique. Lorem ipsum dolor sit, amet
					consectetur adipisicing elit. Quod deleniti dolorem aperiam id, neque
					nihil hic officiis a, ipsa dolores reiciendis unde quaerat. Cum
					dignissimos tenetur atque excepturi saepe similique.
				</div>

				<div className={styles.cardDataFooter}>
					<Button> Responder </Button>
				</div>
			</div>
		</div>
	);
};
