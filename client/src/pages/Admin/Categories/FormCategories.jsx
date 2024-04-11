import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Notices/FormNotice.css';
import './AdminCategories.css';

export const FormCategories = () => {

    const navigate = useNavigate();

    const token = localStorage.getItem('token');
 
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        type: 'Receta'
    });
    
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
        formDataSubmit.append('avatar', imagen);

        const response = await fetch('http://localhost:5000/api/categories', { 
            method: 'POST',
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
                <div className='notice-form-title'>Nueva Categoría</div>
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