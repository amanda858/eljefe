/**
 * Simple in-memory data store with optional JSON-file persistence.
 * In production this would be replaced by a real database.
 */
const fs = require('fs');
const path = require('path');

const DATA_DIR = process.env.DATA_DIR_OVERRIDE || path.join(__dirname, '../../data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function loadUsers() {
  ensureDataDir();
  if (!fs.existsSync(USERS_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
  } catch {
    return [];
  }
}

function saveUsers(users) {
  ensureDataDir();
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
}

const store = {
  users: loadUsers(),

  findUserByEmail(email) {
    return this.users.find((u) => u.email === email) || null;
  },

  findUserById(id) {
    return this.users.find((u) => u.id === id) || null;
  },

  createUser(user) {
    this.users.push(user);
    saveUsers(this.users);
    return user;
  },

  updateUser(id, updates) {
    const idx = this.users.findIndex((u) => u.id === id);
    if (idx === -1) return null;
    this.users[idx] = { ...this.users[idx], ...updates };
    saveUsers(this.users);
    return this.users[idx];
  },
};

module.exports = store;
