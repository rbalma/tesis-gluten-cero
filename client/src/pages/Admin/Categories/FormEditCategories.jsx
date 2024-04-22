import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../Notices/FormNotice.css';

export const FormEditCategories = () => {

    const params = useParams();

    const navigate = useNavigate();

    const token = localStorage.getItem('token');
 
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        type: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`http://localhost:5000/api/categories/${params.categoryId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await res.json();

            setFormData({name: data.data.name, description: data.data.description, type: data.data.type})
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

    const handleTypeChange = (event) => {
        setFormData({
            ...formData,
            type: event.target.value
        });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImagen(file);
    };

    const submit = async (event) => {
        event.preventDefault();

        const formDataSubmit = new FormData();
        formDataSubmit.append('name', formData.name);
        formDataSubmit.append('description', formData.description);
        formDataSubmit.append('type', formData.type);
        imagen !== null && formDataSubmit.append('avatar', imagen);

        const response = await fetch(`http://localhost:5000/api/categories/${params.categoryId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formDataSubmit
        });
        const data = await response.json();
        console.log(data)

        navigate('/admin/categorias');
    };

    return(
        <div className='form-notice-container'>
            <div className='notice-form-container'>
                <div className='notice-form-title'>Editar Categoría</div>
                <form method="post" encType="multipart/form-data" onSubmit={submit} className='notice-form'>
                    <div className='notice-input'>
                        <label>Nombre</label>
                        <input 
                            name='name' 
                            type='text'
                            value={formData.name}
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className='notice-input'>
                        <label>Descripción</label>
                        <input 
                            name='description' 
                            type='text'
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='notice-input'>
                        <label>Imagen (JPG o PNG)</label>
                        <input 
                            name='image' 
                            type='file'
                            onChange={handleImageChange}
                        />
                    </div>
                    <div className='notice-input'>
                        <label>Tipo</label>
                        <fieldset id='category-type'>
                            <div className='fieldset-option'>
                                <input 
                                    type="radio" 
                                    value="Receta" 
                                    id="receta" 
                                    name='category-type' 
                                    checked={formData.type === 'Receta'}
                                    onChange={(event) => handleTypeChange(event)}
                                /><label htmlFor='receta'>Receta</label>
                            </div>
                            <div className='fieldset-option'>
                                <input 
                                    type="radio" 
                                    value="Mapa" 
                                    id="mapa" 
                                    name='category-type' 
                                    checked={formData.type === 'Mapa'}
                                    onChange={(event) => handleTypeChange(event)}
                                /><label htmlFor='mapa'>Mapa</label>
                            </div>
                        </fieldset>
                    </div>
                    <div className='notice-btn-container'>
                        <Link className='notice-cancel-btn' to={'/admin/categorias'}>Cancelar</Link>
                        <button type='submit' className='notice-submit-btn'>Registrar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}