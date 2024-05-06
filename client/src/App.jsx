import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'sonner';
import AppRoutes from './routes/AppRoutes';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchIntervalInBackground: false,
			refetchOnWindowFocus: false,
		},
	},
});

const App = () => {
	return (
		<GoogleOAuthProvider
			clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
		>
			<Toaster
				// toastOptions={{
				// 	style: { fontSize: 15 },
				// }}
				position='bottom-right'
				expand={true}
				richColors
				closeButton
			/>
			<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
				<AppRoutes />
			</QueryClientProvider>
		</GoogleOAuthProvider>
	);
};

export default App;
