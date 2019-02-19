import db from './store';

const { users } = db;

class Users {
  static getById(userId) {
    return users
      .get(userId);
  }
}

export default Users;