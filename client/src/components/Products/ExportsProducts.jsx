import { useState } from 'react';
import { Button } from 'antd';
import { FileExcelOutlined } from '@ant-design/icons';
import { getProducts } from '@/services/api/productsApi';
import { utils, writeFileXLSX } from 'xlsx';

export const ExportsProducts = ({ filters }) => {
	const [isLoading, setIsLoading] = useState(false);

	const exportToExcel = async () => {
		setIsLoading(true);
		try {
			const data = await getProducts({ ...filters, limit: 30000, page: 1, isExport: 1 });
			const ws = utils.json_to_sheet(data.products);
			const wb = utils.book_new();
			utils.book_append_sheet(wb, ws, 'Productos');
			utils.sheet_add_aoa(ws, [['Marca', 'Producto', 'Tipo Producto']], {
				origin: 'A1',
			});
			const max_width = data.products.reduce(
				(w, r) => Math.max(w, r.denominacionVenta.length),
				10
			);
			ws['!cols'] = [
				{ wch: 20 },
				{ wch: max_width },
				{ wch: 20 },
			];
			writeFileXLSX(wb, 'Productos_ANMAT.xlsx', { compression: true });
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Button
			icon={<FileExcelOutlined />}
			loading={isLoading}
			shape='round'
			size='small'
			style={{ backgroundColor: 'transparent' }}
			onClick={exportToExcel}
			danger>
			Exportar Productos
		</Button>
	);
};
