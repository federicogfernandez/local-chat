import Dexie from 'dexie';

const db = new Dexie('chat');
db.version(1).stores({
  users: '++id, username, name, avatar',
  messages: '++id, sender, conversation, content, timestamp',
  conversations: '++id, name, avatar, participants',
});

db.users
  .bulkPut([{
    id: 1,
    username: 'laura',
    name: 'Laura',
    avatar: '/images/laura.jpg',
  }, {
    id: 2,
    username: 'rob',
    name: 'Rob',
    avatar: '/images/robert.jpg',
  }]);

db.conversations
  .put({
    id: 1,
    participants: [1, 2],
  });

export default db;