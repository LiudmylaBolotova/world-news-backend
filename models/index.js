const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const usersPath = path.join(__dirname, "./users.json");

const getAll = async () => {
  const data = await fs.readFile(usersPath);
  return JSON.parse(data);
};

const getById = async (id) => {
  const users = await getAll();
  const res = users.find((item) => item.id === id);
  return res || null;
};

const add = async (data) => {
  const users = await getAll();
  const newUser = {
    id: nanoid(),
    ...data,
  };
  users.push(newUser);
  await fs.writeFile(usersPath, JSON.stringify(users, null, 2));
  return newUser;
};

const updateById = async (id, data) => {
  const users = await getAll();
  const index = users.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  users[index] = { id, ...data };
  await fs.writeFile(usersPath, JSON.stringify(users, null, 2));
  return users[index];
};

const deleteById = async (id) => {
  const users = await getAll();
  const index = users.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const res = users.splice(index, 1);
  await fs.writeFile(usersPath, JSON.stringify(users, null, 2));
  return res;
};

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  deleteById,
};