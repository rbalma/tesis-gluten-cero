import { useEffect, useState } from 'react';
import { Button, Upload, message } from 'antd';
import ImgCrop from 'antd-img-crop';
import defaultImage from '@/assets/images/add-image.png';
import { IconUpload } from '../Icons';

import styles from './UploadAvatar.module.css';

export const UploadAvatar = ({
	onChange,
	value,
  width = 150,
	aspectRatio = 1 / 1,
}) => {
	const [imageUrl, setImageUrl] = useState('');

	useEffect(() => {
		if (value?.[0]?.url) setImageUrl(value[0].url);
	}, [value?.[0]?.url]);

	const beforeUpload = (file) => {
		const isJPGPNG = file.type === 'image/jpeg' || file.type === 'image/png';
		if (!isJPGPNG) message.error('Solo puedes subir una imagen en jpg o png');

		const isLt1M = file.size / 1024 / 1024 < 1;
		if (!isLt1M) message.error('La imagen debe ser menor a 1MB');

		return isJPGPNG && isLt1M;
	};

	const handleChange = async ({ file, fileList }) => {
		const isLt1M = file.size / 1024 / 1024 < 1;
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
			maxZoom={5}
			beforeCrop={beforeUpload}>
			<Upload
				accept='image/png, image/jpeg'
				multiple={false}
				maxCount={1}
				onChange={({ file, fileList }) => handleChange({ file, fileList })}
				onRemove={() => onChange([])}
				customRequest={({ _, onSuccess }) => onSuccess('ok')}
				defaultFileList={value}
        showUploadList={false}
				beforeUpload={false}
			>
        <div className={styles.uploadContainer}>
					<img
						alt='uploading-image'
            width={width}
						src={imageUrl ? imageUrl : defaultImage}
					/>
          <Button size='small' icon={<IconUpload size={14} />}>Subir Foto</Button>
          </div>
			</Upload>
		</ImgCrop>

	);
};
