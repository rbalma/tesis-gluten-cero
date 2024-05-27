import { useEffect, useState } from 'react';
import { Upload, message } from 'antd';
import ImgCrop from 'antd-img-crop';
import PhotoUpIcon from '@/assets/images/photo-image.svg';

const { Dragger } = Upload;

export const UploadImage = ({ onChange, value = [], aspectRatio = 1/1 }) => {
	const [imageUrl, setImageUrl] = useState('');
	useEffect(() => {
		if (value?.[0]?.url) setImageUrl(value[0].url);
	}, [value?.[0]?.url]);

	const beforeUpload = (file) => {
		const isJPGPNG = file.type === 'image/jpeg' || file.type === 'image/png';
		if (!isJPGPNG) message.error('Solo puedes subir una imagen en jpg o png');

		const isLt1M = file.size / 1024 / 1024 < 2;
		if (!isLt1M) message.error('La imagen debe ser menor a 2MB');

		return isJPGPNG && isLt1M;
	};

	const handleChange = async ({ file, fileList }) => {
		if (file.status === 'removed') return setImageUrl('');

		const isLt1M = file.size / 1024 / 1024 < 2;
		const isJPGPNG = file.type === 'image/jpeg' || file.type === 'image/png';
		if (!isLt1M || !isJPGPNG) {
			setImageUrl('');
			onChange([]);
			return;
		}

		if (file.status !== "done") return onChange([]);

		let src = file.url;
		if (!src) {
			src = await new Promise((resolve) => {
				const reader = new FileReader();
				reader.readAsDataURL(file.originFileObj);
				reader.onload = () => resolve(reader.result);
			});
		}
		setImageUrl(src);

		file.status = 'done';
		file.response = '{"status": "success"}';

		onChange(fileList);
	};

	return (
		<ImgCrop
			aspect={aspectRatio}
			modalTitle='Subir Imagen'
			modalOk='Aceptar'
			modalCancel='Cancelar'
			rotationSlider
			showGrid
			maxZoom={5}
			beforeCrop={beforeUpload}
		>
			<Dragger
				name='file'
				multiple={false}
				maxCount={1}
				onChange={({ file, fileList }) => handleChange({ file, fileList })}
				onRemove={() => onChange([])}
				customRequest={({ _, onSuccess }) => onSuccess('ok')}
				defaultFileList={value}
				beforeUpload={false}
				className='draggerMap'
			>
				{imageUrl ? (
					<img width={'min-content'} style={{ maxHeight: 120 }} alt='uploading-image' src={imageUrl} />
				) : (
					<>
						<p style={{ padding: 15 }} >
							<img src={PhotoUpIcon} width={34} height={34} />
						</p>
						<p style={{ fontSize: 14 }}>
							Seleccione o arrastre el archivo a esta área para cargarlo
						</p>
						<p style={{ paddingBottom: 25, fontSize: 12 }}>
							Formato png, jpeg, jpg. Tamaño máximo 2 mb
						</p>
					</>
				)}
			</Dragger>
		</ImgCrop>
	);
};
