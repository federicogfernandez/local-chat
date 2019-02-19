import Dexie from 'dexie';
import db from './store';
import Users from './users';

const all = Dexie.Promise.all;

function addSenderAndSendPostMessage(message) {
  return Users
    .getById(message.sender)
    .then((user) => {
      message.sender = user;

      navigator.serviceWorker.controller.postMessage(JSON.stringify(message));

      return message;
    });
}

class Messages {
  static send(message) {
    message.timestamp = Date.now();
    
    if(message.content.type !== 'event') {
      return db.messages
        .put(message)
        .then((key) => {
          message.id = key;

          return addSenderAndSendPostMessage(message);
        });
    }

    return addSenderAndSendPostMessage(message);
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