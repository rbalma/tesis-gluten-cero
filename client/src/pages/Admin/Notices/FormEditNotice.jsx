import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './FormNotice.css';

export const FormEditNotice = () => {

    const params = useParams();

    const navigate = useNavigate();

    const token = localStorage.getItem('token');
 
    const [formData, setFormData] = useState({
        title: '',
        link: '',
        source: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`http://localhost:5000/api/notices/${params.noticeId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await res.json();
            console.log(data)
            setFormData({title: data.data.title, link: data.data.link, source: data.data.source})
        };
        fetchData();
    }, []);

    const [imagen, setImagen] = useState(null);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImagen(file);
    };

    const submit = async (event) => {
        event.preventDefault();

        const formDataSubmit = new FormData();
        formDataSubmit.append('title', formData.title);
        formDataSubmit.append('link', formData.link);
        formDataSubmit.append('source', formData.source);
        imagen !== null && formDataSubmit.append('avatar', imagen);

        const response = await fetch(`http://localhost:5000/api/notices/${params.noticeId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formDataSubmit
        });
        console.log('Response')
        console.log(response)
        const data = await response.json();
        console.log(data)

        navigate('/admin/noticias');
    };

    return(
        <div className='form-notice-container'>
            <div className='notice-form-container'>
                <div className='notice-form-title'>Editar Noticia</div>
                <form method="post" encType="multipart/form-data" onSubmit={submit} className='notice-form'>
                    <div className='notice-input'>
                        <label>Titulo</label>
                        <input 
                            name='title' 
                            type='text'
                            value={formData.title}
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className='notice-input'>
                        <label>Imagen (JPG o PNG)</label>
                        <input 
                            name='avatar' 
                            type='file'
                            onChange={handleImageChange}
                        />
                    </div>
                    <div className='notice-input'>
                        <label>Fuente</label>
                        <input 
                            name='source' 
                            type='text'
                            value={formData.source}
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className='notice-input'>
                        <label>Link</label>
                        <input 
                            name='link' 
                            type='text'
                            value={formData.link}
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className='notice-btn-container'>
                        <Link className='notice-cancel-btn' to={'/admin/noticias'}>Cancelar</Link>
                        <button type='submit' className='notice-submit-btn'>Registrar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}