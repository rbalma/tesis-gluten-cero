import { Button, Modal } from 'antd';
import { MailFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export const AccountConfirmMail = ({ open, formInstance }) => {
	const navigate = useNavigate();

	const handleOk = () => {
		navigate('/');
	};

	return (
		<Modal
			open={open}
			title={null}
			footer={null}
			closable={false}
			bodyStyle={{
				textAlign: 'justify',
				display: 'flex',
				flexDirection: 'column',
			}}
			width={'max-content'}
		>
			<MailFilled style={{ fontSize: 48, margin: '20px auto' }} />
			<p>
				Enviamos un correo a <b>{formInstance.getFieldValue('email')}</b>.
				Contiene un enlace en el que debe hacer clic para confirmar su cuenta.
			</p>
			<p>
				Deberá hacer esto antes de poder acceder a nuestro sitio como miembro
				registrado.
			</p>
			<Button
				type='primary'
				style={{ width: 150, marginLeft: 'auto' }}
				onClick={handleOk}
			>
				Aceptar
			</Button>
		</Modal>
	);
};
