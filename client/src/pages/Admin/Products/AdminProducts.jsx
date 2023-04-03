import { Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { toast } from 'sonner';
import useCrud from '@/hooks/useCrud';

import styles from './AdminProducts.module.css';

const { Dragger } = Upload;
const props = {
	name: 'file',
	accept: '.xlsx',
	maxCount: 1,
	beforeUpload: (file) => {
		const isExcel =
			file.type ===
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
		if (!isExcel) {
			toast.error(`No es un archivo Excel`);
		}
		return isExcel || Upload.LIST_IGNORE;
	},
	onChange(info) {
		const { status } = info.file;
		if (status === 'done') {
			toast.success('El archivo se ha subido correctamente');
		} 
		// else if (status === 'error') {
		// 	toast.error('La carga del archivo falló');
		// }
	},
};

export const AdminProducts = () => {
	const { 0: isLoading, 1: postFile } = useCrud('/products-anmat');

	const loadFile = async ({ file, filename, onError, onSuccess }) => {
		const formData = new FormData();

		formData.append('file', file, filename);

		const data = await postFile(formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});

		if (data?.ok)
			return onSuccess({
				uid: file?.uid,
				name: file?.name,
				status: 'done',
				response: '{"status": "success"}',
			});

		onError('No se pudo cargar el archivo', {
			uid: file?.uid,
			name: file?.name,
			status: 'error',
			response: '{"status": "error"}',
		});
	};

	return (
		<div className={styles.containerAdminProducts}>
			<h1 className={styles.titleAdminProducts}>Productos aprobados por ANMAT</h1>
			<div style={{ height: 200 }}>
				<Dragger {...props} customRequest={loadFile}>
					<p className='ant-upload-drag-icon'>
						<InboxOutlined />
					</p>
					<p className='ant-upload-text'>
						Haga clic o arrastre el archivo a esta área para cargarlo
					</p>
					<p className='ant-upload-hint'>
						Se debe cargar un único arhivo Excel con un tamaño máximo de un 2 mb
					</p>
				</Dragger>
			</div>
		</div>
	);
};
