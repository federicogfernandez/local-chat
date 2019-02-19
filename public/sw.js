self.addEventListener('message', (event) => {
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage(event.data);
    });
  });
});