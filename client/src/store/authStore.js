import axiosInstance from '@/utils/axiosInstance';
import create from 'zustand';

const useAuthStore = create((set) => ({
	userProfile: null,
	checking: true,
	addUser: (user, token) => {
		localStorage.setItem('token', token);
		localStorage.setItem('token-init-date', new Date().getTime());
		set((state) => ({ ...state, userProfile: user }));
	},
	removeUser: () => {
		localStorage.clear();
		set({ userProfile: null });
	},
	finishChecking: () => set((state) => ({ ...state, checking: false })),
	startChecking: async () => {
		try {
			const resp = await axiosInstance.get('/refresh-token');
			const body = resp.data;
			if (body.ok) {
				localStorage.setItem('token', body.token);
				localStorage.setItem('token-init-date', new Date().getTime());
				set(() => ({ userProfile: body.user, checking: false }));
			}
		} catch (error) {
			console.log(error.message);
		} finally {
			set(() => ({ checking: false }));
		}
	},
}));

export default useAuthStore;
