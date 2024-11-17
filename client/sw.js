self.addEventListener('push', function(event) {
  console.log({ event })
    const data = event.data.json();
    console.log('notificación!')
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.message,
        icon: 'pwa-192x192.png'
    })
    );
  });