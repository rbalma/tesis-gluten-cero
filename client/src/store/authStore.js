import create from 'zustand';
import zustymiddleware from 'zustymiddleware';
import axiosInstance from '@/utils/axiosInstance';
import { deleteSubscription, sendSubscription } from '@/utils/notificacionesPush';

const useAuthStore = create(
	zustymiddleware((set) => ({
		userProfile: null,
		checking: true,
		addUser: (user, token) => {
			localStorage.setItem('token', token);
			localStorage.setItem('token-init-date', new Date().getTime());
			// Service Worker Push Notifications Support
			if ("serviceWorker" in navigator) {
				sendSubscription().catch(err => console.log(err));
			}
			set((state) => ({ ...state, userProfile: user }));
		},
		removeUser: () => {
			localStorage.clear();
			deleteSubscription().catch(err => console.log(err));
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
					// Service Worker Push Notifications Support
			if ("serviceWorker" in navigator) {
				sendSubscription().catch(err => console.log(err));
			}
					set(() => ({ userProfile: body.user, checking: false }));
				}
			} catch (error) {
				console.log(error.message);
			} finally {
				set(() => ({ checking: false }));
			}
		},
		addFavoriteRecipe: (recipeId) =>
			set((state) => ({
				...state,
				userProfile: {
					...state.userProfile,
					favRecipes: [...state.userProfile.favRecipes, recipeId],
				},
			})),
		deleteFavoriteRecipe: (recipeId) =>
			set((state) => ({
				...state,
				userProfile: {
					...state.userProfile,
					favRecipes: state.userProfile.favRecipes.filter(
						(favRecipe) => favRecipe !== recipeId
					),
				},
			})),
		addFavoriteMarker: (markerId) =>
			set((state) => ({
				...state,
				userProfile: {
					...state.userProfile,
					favMarkers: [...state.userProfile.favMarkers, markerId],
				},
			})),
		deleteFavoriteMarker: (markerId) =>
			set((state) => ({
				...state,
				userProfile: {
					...state.userProfile,
					favMarkers: state.userProfile.favMarkers.filter(
						(favMarker) => favMarker !== markerId
					),
				},
			})),
		addFavoriteProduct: (productId) =>
			set((state) => ({
				...state,
				userProfile: {
					...state.userProfile,
					favProducts: [...state.userProfile.favProducts, productId],
				},
			})),
		deleteFavoriteProduct: (productId) =>
			set((state) => ({
				...state,
				userProfile: {
					...state.userProfile,
					favProducts: state.userProfile.favProducts.filter(
						(favProduct) => favProduct !== productId
					),
				},
			})),
	}))
);

export default useAuthStore;
