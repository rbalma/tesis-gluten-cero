import { Button, Input, Space } from 'antd';
import { SearchIcon } from '../Icons';

export const getColumnSearchProps = (dataIndex) => ({
	filterDropdown: ({
		setSelectedKeys,
		selectedKeys,
		confirm,
		clearFilters,
	}) => (
		<div
			style={{
				padding: 8,
			}}
			onKeyDown={(e) => e.stopPropagation()}>
			<Input
				placeholder={`Buscar por ${dataIndex}`}
				value={`${selectedKeys[0] || ''}`}
				onChange={(e) =>
					setSelectedKeys(e.target.value ? [e.target.value] : [])
				}
				onPressEnter={() => confirm()}
				style={{
					marginBottom: 8,
					display: 'block',
				}}
			/>
			<Space>
				<Button
					type='primary'
					onClick={() => confirm()}
					size='small'
					style={{
						width: 90,
					}}>
					Buscar
				</Button>
				<Button
					onClick={() => clearFilters()}
					size='small'
					style={{
						width: 90,
					}}>
					Borrar
				</Button>
			</Space>
		</div>
	),
	filterIcon: (filtered) => (
		<SearchIcon
			size={16}
			style={{
				color: filtered ? '#1890ff' : undefined,
			}}
		/>
	),
});
