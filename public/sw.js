self.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);

  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage(data);
    });
  });
});