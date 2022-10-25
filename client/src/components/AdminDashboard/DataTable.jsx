import { useState } from 'react';
import { Table } from 'antd';

export const DataTable = ({
	columns,
	loading,
	data,
	count,
	fetch,
	showHeader = true,
	perPage = 7,
}) => {
	const [currentPage, setCurrentPage] = useState(1);

	const onChangePagination = async page => {
		fetch(f => ({ ...f, page: page }));
		setCurrentPage(page);
	};

	const config = {
		className: 'gx-table-responsive',
		pagination: {
			pageSize: perPage,
			total: count,
			current: currentPage,
			simple: true,
			onChange: onChangePagination,
			disabled: loading,
		},
		size: 'small',
		width: '100%',
		scroll: { x: 1000 },
		locale: { emptyText: 'Sin Datos' },
		tableLayout: 'fixed',
	};

	return (
		<>
			<Table
				{...config}
				columns={[...columns]}
				loading={loading}
				dataSource={data}
				showHeader={showHeader}
				scroll={{ x: true }}
				rowKey={record => `${record.id}`}
			/>
		</>
	);
};
