import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';

const LoadAvatar = ({ onChange, value }) => {
	const beforeUpload = (file) => {
		const isJPGPNG = file.type === 'image/jpeg' || file.type === 'image/png';
		if (!isJPGPNG) message.error('Solo puedes subir una imagen en jpg o png');

		const isLt1M = file.size / 1024 / 1024 < 1;
		if (!isLt1M) message.error('La imagen debe ser menor a 1MB!');

		if (isJPGPNG && isLt1M) return true;
	};

	const onPreview = async (file) => {
		let src = file.url;
		if (!src) {
			src = await new Promise((resolve) => {
				const reader = new FileReader();
				reader.readAsDataURL(file.originFileObj);
				reader.onload = () => resolve(reader.result);
			});
		}
		const image = new Image();
		image.src = src;
		const imgWindow = window.open(src);
		imgWindow.document.write(image.outerHTML);
	};

	return (
		<ImgCrop
			shape='round'
			modalTitle='Subir Imagen'
			modalOk='Aceptar'
			modalCancel='Cancelar'
			rotate
			maxZoom={5}
		>
			<Upload
				name='picture'
				accept='.png, .jpeg, .jpg'
				listType='picture'
				maxCount={1}
				defaultFileList={value}
				beforeUpload={beforeUpload}
				onPreview={onPreview}
				onChange={({ fileList }) => onChange(fileList)}
				customRequest={({ file, onSuccess }) => onSuccess('ok')}
			>
				Ingresa una foto de la receta:{' '}
				<Button size='small' icon={<UploadOutlined />}>
					Subir
				</Button>
			</Upload>
		</ImgCrop>
	);
};

export default LoadAvatar;
