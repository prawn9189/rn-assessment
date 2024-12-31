import * as SQLite from "expo-sqlite";

export type User = {
  id?: number;
  username: string;
  password: string;
  logged_in: number;
};

export type Appt = {
  id?: number;
  patient: string;
  contact: string;
  date: string;
  time: string;
  reason: string;
  notify?: number;
  review: number;
  status: string;
};

const dbName = "appointment.db" as const;

const initDB = async () => {
  const db = await SQLite.openDatabaseAsync(dbName);

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY NOT NULL,
      username TEXT NOT NULL,
      password TEXT NOT NULL,
      logged_in INTEGER DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS appointments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      patient TEXT NOT NULL,
      contact TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      reason TEXT NOT NULL,
      notify INTEGER DEFAULT 1,
      review INTEGER DEFAULT 0,
      status TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sum INTEGER NOT NULL,
      total INTEGER NOT NULL,
      avg REAL NOT NULL
    );
  `);
};

const seedData = async () => {
  const db = await SQLite.openDatabaseAsync(dbName);

  const allUsers: User[] = await db.getAllAsync("SELECT * FROM users");
  if (!allUsers.length) {
    await db.execAsync(`
      INSERT INTO users (id, username, password, logged_in) VALUES (1, 'user', 'password', 1);
      INSERT INTO users (id, username, password, logged_in) VALUES (2, 'admin', 'password', 0);
    `);
  }
};

const checkLogin = async () => {
  const db = await SQLite.openDatabaseAsync(dbName);

  const allUsers: User[] = await db.getAllAsync("SELECT * FROM users");
  for (const user of allUsers) {
    if (user.logged_in) {
      return user.username;
    }
  }
  return "";
};

const login = async (username: string, password: string) => {
  const db = await SQLite.openDatabaseAsync(dbName);

  const result: User | null = await db.getFirstAsync(
    "SELECT * FROM users WHERE username = ?",
    username,
  );
  if (result && result.password === password) {
    await db.runAsync(
      "UPDATE users SET logged_in = ? WHERE username = ?",
      1,
      username,
    );
    return true;
  }
  return false;
};

const logout = async () => {
  const db = await SQLite.openDatabaseAsync(dbName);

  await db.runAsync(
    "UPDATE users SET logged_in = ? WHERE username = ?",
    0,
    "user",
  );
  await db.runAsync(
    "UPDATE users SET logged_in = ? WHERE username = ?",
    0,
    "admin",
  );
};

const saveAppt = async ({
  contact,
  date,
  patient,
  reason,
  review,
  status,
  time,
}: Appt) => {
  const db = await SQLite.openDatabaseAsync(dbName);
  await db.runAsync(
    `
    INSERT INTO appointments (
      patient, contact, date, time, reason, review, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?);
  `,
    patient,
    contact,
    date,
    time,
    reason,
    review,
    status,
  );
};

const getALlAppts = async () => {
  const db = await SQLite.openDatabaseAsync(dbName);
  const result = await db.getAllAsync("SELECT * FROM appointments");
  return result;
};

export { checkLogin, getALlAppts, initDB, login, logout, saveAppt, seedData };
