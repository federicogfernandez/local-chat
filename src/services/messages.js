import Dexie from 'dexie';
import db from './store';

const all = Dexie.Promise.all;

class Messages {
  static send(message) {
    message.timestamp = Date.now();
    
    return db.messages
      .put(message)
      .then((key) => {
        message.id = key;
        navigator.serviceWorker.controller.postMessage(JSON.stringify(message));

        return message;
      });
  }

  static getByConversationId(conversation) {
    return db.messages
      .where({ conversation })
      .sortBy('timestamp')
      .then((messages) => {
        const senderPromises = messages.map((message) => db.users.get(message.sender));

        return all(senderPromises)
          .then((data) => {
            messages.forEach((message, i) => {
              message.sender = data[i];
            });

            return messages;
          });
      });
  }

  static get(messageId) {
    return db.messages.get(messageId);
  }
}

export default Messages;