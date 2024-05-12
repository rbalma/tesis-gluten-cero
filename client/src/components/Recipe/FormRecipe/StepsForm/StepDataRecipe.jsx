import { UploadImage } from '@/components/Upload/UploadImage';
import { useGetCategories } from '@/services/queries/categoryQueries';
import { Form, Input, InputNumber, Select, Space } from 'antd';

const categoriesFilters = {
	type: 'R',
	visible: '1'
}

export const StepDataRecipe = () => {
	const { isFetching, data } = useGetCategories(categoriesFilters);

	return (
		<>
			<Form.Item label='Título' name='title'>
				<Input />
			</Form.Item>

			<Space size={[32, 16]} wrap>
				<Form.Item label='Categoría' name='category'>
					<Select
						loading={isFetching}
						placeholder=''
						style={{ width: 200 }}
						options={data}
						fieldNames={{
							label: 'name',
							value: '_id',
						}}
					/>
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

			<Form.Item label='Foto' name='image'>
				<UploadImage aspectRatio={16 / 9} />
			</Form.Item>
		</>
	);
};