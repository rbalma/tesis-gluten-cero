import { Input, Row, Col, Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

export const ToolBar = ({
	onSearch,
	searchValue,
	onChangeSearchValue,
	handleAdd,
}) => {
	return (
		<Row justify='center' style={{ margin: '20px 0px 50px'}}>
			<Col xs={24} sm={20}>
				<Input.Search
					placeholder='Ingresar una búsqueda'
					onSearch={onSearch}
					onChange={(e) => onChangeSearchValue(e.target.value)}
					value={searchValue}
				/>
			</Col>

			{/* <Col>
				<Button icon={<PlusCircleOutlined />} onClick={() => handleAdd()}>
					Nuevo
				</Button>
			</Col> */}
		</Row>
	);
};
