import { ToastContainer } from 'react-toastify';
import AppRoutes from './routes/AppRoutes';


const App = () => {
	return (
		<>
			<AppRoutes />
			<ToastContainer theme='colored' pauseOnFocusLoss={false} />
		</>
	);
};

export default App;
