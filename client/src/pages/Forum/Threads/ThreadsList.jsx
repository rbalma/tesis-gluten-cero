import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../Posts/Card';
import useAuthStore from '@/store/authStore';
import './ThreadsList.css';

// https://account.mongodb.com/account/login?n=%2Fv2&nextHash=%23org%2F60afd24f23992501a9b2b682%2Fprojects

export const ThreadsList = () => {

	const [staticThreads, setStaticThreads] = useState(null);

	const [threads, setThreads] = useState(null);

	const [searchTerm, setSearchTerm] = useState('');

	const filteredThreads = threads?.filter((thread) =>
		thread.title.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const [filter, setFilter] = useState('recientes');

	const switchFilter = (filter) => {
		setFilter(filter);
		orderThreads(filter);
	};

	const orderThreads = (filter) => {
		if(filter === 'recientes') {
			const threadsCopy = [...staticThreads];
			setThreads(threadsCopy);
		} else {
			const threadsCopy = [...staticThreads];

			threadsCopy.sort((threadA, threadB) => {
				const postCountA = threadA.posts.length;
				const postCountB = threadB.posts.length;
	
				return postCountB - postCountA;
			});
	
			setThreads(threadsCopy);
		};
	};

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch('http://localhost:5000/api/threads', {
				method: 'GET',
			});
			const data = await res.json();
			setThreads(data.data);
			setStaticThreads(data.data);
		}
		fetchData();
	}, []);

	const { userProfile } = useAuthStore();

	return ( 
		<div className='foro-container'>
			<div className='foro-container-background'>
				<div className='foro-header'>
					<div className='foro-header__sections'>
						{userProfile !== null &&
							<Link to={'/foro-formulario'} className='foro-header__sections-btn-new'>Nuevo</Link>
						}
						<button className={filter === 'recientes' ? 'foro-header__sections-btn foro-header__sections-btn_active' : 'foro-header__sections-btn'} onClick={()=>switchFilter('recientes')}>Recientes</button>
						<button className={filter === 'populares' ? 'foro-header__sections-btn foro-header__sections-btn_active' : 'foro-header__sections-btn'} onClick={()=>switchFilter('populares')}>Populares</button>
					</div>
					<div className='foro-header__search'>
						<input 
							type='text' 
							placeholder='Buscar'
							value={searchTerm}
							onChange={(event) => setSearchTerm(event.target.value)}
						/>
					</div>
				</div>
				<div className='foro-body'>
					<div className='foro-body__title'>
						<p>¡Te damos la bienvenida al foro de la comunidad de Gluten Cero!</p>
					</div>
					<div className='foro-body__content'>
						{
							(threads === null || filteredThreads === undefined) ? <h1>Cargando...</h1> :
							threads.length === 0 ? <h1>No hay posteos</h1> :
							filteredThreads.length === 0 ? <h1>No hay posteos con ese titulo</h1> :
							filteredThreads.map((thread) => (
								<Card key={thread._id} thread={thread}/>
							))
						}
					</div>
				</div>
			</div>
		</div>
	);
};