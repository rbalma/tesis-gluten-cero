import { Select } from 'antd';

export const SortProducts = ({ handleChange }) => {
	return (
		<div>
			Ordenar por:
			<Select
				defaultValue='denominacionVenta'
				bordered={false}
				dropdownStyle={{ minWidth: 130 }}
				placement='bottomLeft'
				onChange={handleChange}
				options={[
					{
						value: 'denominacionVenta',
						label: 'Producto',
					},
					{
						value: 'marca',
						label: 'Marca',
					},
					{
						value: 'likesCount',
						label: 'Favoritos',
					},
				]}
			/>
		</div>
	);
};
