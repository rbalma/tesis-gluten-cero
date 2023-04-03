import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'sonner';
import AppRoutes from './routes/AppRoutes';

const App = () => {
	return (
		<GoogleOAuthProvider
			clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
		>
			<Toaster
				toastOptions={{
					style: { fontSize: 15 },
				}}
				position='top-right'
				richColors
			/>
			<AppRoutes />
		</GoogleOAuthProvider>
	);
};

export default App;
