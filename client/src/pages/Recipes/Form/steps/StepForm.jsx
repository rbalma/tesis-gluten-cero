import { Form, Input, Select } from 'antd';
// import UploadImage from '@/components/Upload/UploadImage';

export const StepForm = () => {
	//const [avatar, setAvatar] = useState([]);

	return (
		<>
			<Form.Item label='Ingresa un Título:' name='title'>
				<Input />
			</Form.Item>
			<Form.Item label='Selecciona una categoría:' name='category'>
				<Select>
					<Select.Option value={0}>Comercio</Select.Option>
					<Select.Option value={1}>Restaurante</Select.Option>
					<Select.Option value={2}>Centro de Salud</Select.Option>
				</Select>
			</Form.Item>

			{/* UPLOAD FOTO */}

			<Form.Item name='image' required>
				{/* <UploadImage /> */}
			</Form.Item>
		</>
	);
};
