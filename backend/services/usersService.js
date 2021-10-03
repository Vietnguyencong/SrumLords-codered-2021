const { db_promisePool } = require("../utils/mysql_conn");

async function get() {
  const query = `SELECT *
      FROM user`;
  const [rows, fields] = await db_promisePool.query(query);
  // console.log("viet ngueyncong", rows);s
  var ndata = JSON.parse(JSON.stringify(rows).split('"id":').join('"id":'));
  return ndata;
}

async function getUser(id) {
  const user = `Select * from USERS where user_id=${id}`;

  let message = `Error in getting user ${id}`;

  var ndata = JSON.parse(JSON.stringify(user).split('"id":').join('"id":'));
  return ndata[0];
}

async function getUserByEmail(email) {
  try {
    const query = `select * from user where email = ?`;
    const [rows, fields] = await db_promisePool.query(query, [email]);
    return [rows, null];
  } catch (e) {
    return [null, e];
  }
}
async function create(user) {
  const result = await db_promisePool.query(
    `INSERT INTO user 
    (id, first, last, email, role, address, is_admin, created_time, updated_time) 
    VALUES 
    (?, ?, ?, ?, ?, ?, ?, ?,?)`,
    [
      user.id,
      user.first,
      user.last,
      user.email,
      user.role,
      user.address,
      user.is_admin,
      user.created_time,
      user.updated_time,
    ]
  );
  message = `Maybe new user was created successfully`;
}
module.exports = {
  get,
  getUser,
  getUserByEmail,
};
