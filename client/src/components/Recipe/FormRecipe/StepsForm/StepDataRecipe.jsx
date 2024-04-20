import { UploadImage } from '@/components/Upload/UploadImage';
import { Form, Input, InputNumber, Select, Space } from 'antd';

export const StepDataRecipe = () => {

	return (
		<>
			<Form.Item label='Título' name='title'>
				<Input />
			</Form.Item>

			<Space size={[32, 16]} wrap>
				<Form.Item label='Categoría' name='category'>
					<Select style={{ width: 200 }}>
						<Select.Option value={0}>Bebidas</Select.Option>
						<Select.Option value={1}>Dulces</Select.Option>
						<Select.Option value={2}>Ensaladas</Select.Option>
					</Select>
				</Form.Item>

				<Form.Item label='Tiempo de preparación'>
					<Space>
						<Form.Item name='preparationTime' noStyle>
							<InputNumber placeholder='0' min={0} style={{ width: 70 }} />
						</Form.Item>
						<span>minutos</span>
					</Space>
				</Form.Item>

				<Form.Item label='Rendimiento'>
					<Space>
						<Form.Item name='performance' noStyle>
							<InputNumber placeholder='0' min={0} style={{ width: 70 }} />
						</Form.Item>
						<span>porciones</span>
					</Space>
				</Form.Item>
			</Space>

			<Form.Item label='Foto' name='picture'>
				<UploadImage aspectRatio={16/9} />
			</Form.Item>
		</>
	);
};