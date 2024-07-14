import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '@/store/authStore';
import NotFoundScreen from '@/pages/NotFound/NotFoundScreen';
import './ThreadForm.css';

export const ThreadForm = () => {

  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const userProfile = useAuthStore((state) => state.userProfile);

  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const submit = async (event) => {
    event.preventDefault();
    
    const response = await fetch('http://localhost:5000/api/threads', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title: formData.title,
        description: formData.description,
        user: userProfile.id
      }),
    });

    const data = await response.json();
    console.log(data)

    navigate('/foro');
  };

  if(userProfile === null) {
    return(
      <NotFoundScreen/>
    );
  };

  return (
    <div className='foro-container'>
			<div className='foro-container-background'>
        <div className='foro-form-container'>
          <div className='foro-form-title'>Nuevo Topic</div>
          <form onSubmit={submit} className='foro-form'>
            <div className='foro-input'>
              <label>Titulo</label>
              <input 
                name='title' 
                type='text'
                value={formData.title}
                required
                onChange={handleChange}
              />
            </div>
            <div className='foro-input'>
              <label>Contenido</label>
              <textarea 
                name='description' 
                rows={5}
                value={formData.description}
                required
                onChange={handleChange}
              />
            </div>
            <div className='foro-btn-container'>
              <Link className='foro-cancel-btn' to={'/foro'}>Cancelar</Link>
              <button type='submit' className='foro-submit-btn'>Registrar</button>
            </div>
          </form>
        </div>
			</div>
		</div>
  );
};
