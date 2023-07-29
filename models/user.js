const db = require('../config/db');

class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.age = user.age;
    this.website = user.website;
    this.introduction = user.introduction;
    this.username = user.username;
    this.password = user.password;
  }

  // Listar todos os usuários
  static async getAllUsers() {
    try {
      const query = 'SELECT * FROM users';
      const result = await db.query(query);

      // Return the array of users
      return result.rows;
    } catch (error) {
      throw new Error('Error getting all users: ' + error.message);
    }
  }

  // Method to get a user by ID
  static async getUserById(id) {
    try {
      const query = 'SELECT * FROM users WHERE id = $1';
      const values = [id];
      const result = await db.query(query, values);

      // Return the found user
      if (result.rows.length === 0) return null;
      return new User(result.rows[0]);
    } catch (error) {
      throw new Error('Error getting user by ID: ' + error.message);
    }
  }

  // Method to create a new user
  static async createUser(user) {
    try {
      console.log(user.name);
      const query =
        'INSERT INTO users (name, email, age, website, introduction, username, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
      const values = [
        user.name,
        user.email,
        user.age,
        user.website,
        user.introduction,
        user.username,
        user.password,
      ];
      const result = await db.query(query, values);

      // Return the newly created user
      return result.rows[0];
    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    }
  }

  // Method to update a user
  async updateUser() {
    try {
      const {
        id,
        name,
        email,
        age,
        website,
        introduction,
        username,
        password,
      } = this;

      const query =
        'UPDATE users SET name = $2, email = $3, age = $4, website = $5, introduction = $6, username = $7, password = $8 WHERE id = $1 RETURNING *';
      const values = [
        id,
        name,
        email,
        age,
        website,
        introduction,
        username,
        password,
      ];

      const result = await db.query(query, values);

      // Return the updated user
      return result.rows[0];
    } catch (error) {
      throw new Error('Error updating user: ' + error.message);
    }
  }

  // Method to get username/password
  static async getUserByUsernamePassword(username, password) {
    try {
      const query = 'SELECT * FROM users WHERE username = $1 and password = $2';
      const values = [username, password];
      const result = await db.query(query, values);

      // Return the found user
      if (result.rows.length === 0) return null;
      return new User(result.rows[0]);
    } catch (error) {
      throw new Error('Error getting user by ID: ' + error.message);
    }
  }

  // Method to delete a user
  async deleteUser() {
    try {
      const query = 'DELETE FROM users WHERE id = $1';
      const values = [this.id];
      await db.query(query, values);

      // Return success message
      return 'User deleted successfully';
    } catch (error) {
      throw new Error('Error deleting user: ' + error.message);
    }
  }
}

module.exports = User;
