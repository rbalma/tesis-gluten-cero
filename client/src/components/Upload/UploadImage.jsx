import { useEffect, useState } from 'react';
import { Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import { PhotoUpIcon } from '../Icons';

const { Dragger } = Upload;

export const UploadImage = ({ image, onChange, value }) => {
	const [imageUrl, setImageUrl] = useState('');
	useEffect(() => {
		setImageUrl(image);
	}, [image]);

	const beforeUpload = (file) => {
		const isJPGPNG = file.type === 'image/jpeg' || file.type === 'image/png';
		if (!isJPGPNG) message.error('Solo puedes subir una imagen en jpg o png');

		const isLt1M = file.size / 1024 / 1024 < 1;
		if (!isLt1M) message.error('La imagen debe ser menor a 1MB');

		return isJPGPNG && isLt1M;
	};

	const handleChange = async ({ file, fileList }) => {
		
		if (file.status === 'removed') return setImageUrl('');
		console.log({ file })

		const isLt1M = file.size / 1024 / 1024 < 1;
		const isJPGPNG = file.type === 'image/jpeg' || file.type === 'image/png';
		if (!isLt1M || !isJPGPNG) return;

		const formData = new FormData();
		const avatar = file.originFileObj;

		let src = file.url;
		if (!src) {
			src = await new Promise(resolve => {
				const reader = new FileReader();
				reader.readAsDataURL(file.originFileObj);
				reader.onload = () => resolve(reader.result);
			});
		}
	setImageUrl(src)
		formData.append('avatar', avatar, avatar.name);

		// const requestConfig = {
		// 	headers: { 'Content-Type': 'multipart/form-data' },
		// };

	//	const resp = await putData(perfilId, formData, requestConfig);
			file.status = 'done';
			file.response = '{"status": "success"}';
		
			onChange(fileList);
	};

	return (
		<ImgCrop
			//aspect={16 / 9}
			modalTitle='Subir Imagen'
			modalOk='Aceptar'
			modalCancel='Cancelar'
			rotationSlider
			maxZoom={5}
			beforeCrop={beforeUpload}
		>
			<Dragger
				name='file'
				multiple={false}
				maxCount={1}
				onChange={({ file, fileList }) => handleChange({ file, fileList })}
				beforeUpload={false}
				className='draggerMap'
			>
				{imageUrl ? (
					<img width={'min-content'} style={{ maxHeight: 200 }} alt='uploading-image' src={imageUrl} />
				) : (
					<>
						<p style={{ padding: 20 }} >
							<PhotoUpIcon size={48} />
						</p>
						<p className='ant-upload-text'>
							Seleccione o arrastre el archivo a esta área para cargarlo
						</p>
						<p className='ant-upload-hint' style={{ paddingBottom: 25 }}>
							Formato png, jpeg, jpg. Tamaño máximo 1 mb
						</p>
					</>
				)}
			</Dragger>
		</ImgCrop>
	);
};
