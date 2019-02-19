import Dexie from 'dexie';
import db from './store';
import Messages from './messages';

const all = Dexie.Promise.all;

class Conversations {
  static getById(conversationId) {
    return db.conversations
      .get(conversationId)
      .then((conversation) => {
        const participantsPromises = conversation.participants.map((participant) => db.users.get(participant));

        return all([
          all(participantsPromises),
          Messages.getByConversationId(conversationId),
        ]).then((data) => {
          conversation.participants.forEach((participant, i) => {
            conversation.participants[i] = data[0][i];
          });

          conversation.messages = data[1];

          return conversation;
        });
      });
  }
}

export default Conversations;