// self.addEventListener('push', onPush);

// async function onPush(event) {
//   if (event.data) {
//     const data = event.data.json();
//     const { title, ...rest } = data;

//     // Send the push data to the application
//     const clients = await self.clients.matchAll();
//     clients.forEach((client) => client.postMessage(data));

//     await event.waitUntil(
//       self.registration.showNotification(title, {
//         ...rest,
//       }),
//     );
//   }
// }

self.addEventListener('push', async (event) => {
	const data = event.data.json();

	// Send the push data to the application
	const clients = await self.clients.matchAll();
	clients.forEach((client) => client.postMessage(data));

	event.waitUntil(
		self.registration.showNotification(data.title, {
			body: data.message,
			icon: 'maskable_icon.png',
		})
	);
});
