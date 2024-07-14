import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useAuthStore from '@/store/authStore';
import NotFoundScreen from '@/pages/NotFound/NotFoundScreen';
import './ThreadForm.css';

export const ThreadEditForm = () => {

  const params = useParams();

  const [formData, setFormData] = useState({title: '', description: ''});

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`http://localhost:5000/api/threads/${params.hiloId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await res.json();
            setFormData({title: data.data.title, description: data.data.description})
        };
        fetchData();
    }, []);

  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const userProfile = useAuthStore((state) => state.userProfile);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const submit = async (event) => {
    event.preventDefault();
    
    const response = await fetch(`http://localhost:5000/api/threads/${params.hiloId}`, {
      method: 'PUT',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title: formData.title,
        description: formData.description,
      }),
    });

    const data = await response.json();
    console.log(data)

    navigate(`/foro/${params.hiloId}`);
  };

  if(userProfile === null) {
    return(
      <NotFoundScreen />
    );
  };

  if(formData === null) {
    return(
        <h1>Cargando...</h1>
    );
  };

  return (
    <div className='foro-container'>
		<div className='foro-container-background'>
            <div className='foro-form-container'>
                <div className='foro-form-title'>Editar Topic</div>
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
                        <Link className='foro-cancel-btn' to={`/foro/${params.hiloId}`}>Cancelar</Link>
                        <button type='submit' className='foro-submit-btn'>Guardar</button>
                    </div>
                </form>
            </div>
		</div>
	</div>
  );
};
