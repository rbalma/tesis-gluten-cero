import axiosInstance from './axiosInstance';
let subscription;

const sendSubscription = async () => {
	const register = await navigator.serviceWorker.register('/sw.js');

	// Listen Push Notifications
	subscription = await register.pushManager.subscribe({
		userVisibleOnly: true,
		applicationServerKey: urlBase64ToUint8Array(
			import.meta.env.VITE_PUBLIC_VAPID_KEY
		),
	});

	const permission = await Notification.requestPermission();
	if (permission === 'granted') {
		console.log("Notificaciones permitidas");
	} else {
		console.log("Notificaciones no permitidas");
	}

	// Envía la suscripción al servidor
	await axiosInstance.post('/subscription', JSON.stringify(subscription));
	console.log('Subscribed!');
};

function urlBase64ToUint8Array(base64String) {
	const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
	const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);

	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}

const deleteSubscription = async () => {
	if (!subscription) return;
	const data = JSON.stringify(subscription);
	const { keys } = JSON.parse(data);
	await subscription.unsubscribe();
	
	await axiosInstance.delete(`/subscription/${keys.auth}`, );
	
	console.log('Unsubscribed!');
};

export {
    sendSubscription,
    deleteSubscription,
}