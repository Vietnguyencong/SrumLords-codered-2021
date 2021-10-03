const { db_promisePool } = require("../utils/mysql_conn");

async function getall() {
  try {
    const query = `select * from inspections`;
    const [rows, fields] = await db_promisePool.query(query);
    return [rows, null];
  } catch (e) {
    return [null, e];
  }
}

async function getone() {
  try {
    const query = `select * from inspections`;
    const [rows, fields] = await db_promisePool.query(query);
    return [rows, null];
  } catch (e) {
    return [null, e];
  }
}

async function addone(new_information) {
  if (!new_information) {
    return [null, " info was invalid!"];
  }
  try {
    const query = `INSERT INTO inspections(inspection_date, completed_date, inspector, inspection_note, inspection_question1, inspection_answer1, inspection_question2, inspection_answer2, inspection_question3, inspection_answer3, user_id) VALUES (
      '${new_information.inspection_date}',
      '${new_information.completed_date}',
      '${new_information.inspector}',
      '${new_information.inspection_note}',
      '${new_information.inspection_question1}',
      '${new_information.inspection_answer1}',
      '${new_information.inspection_question2}',
      '${new_information.inspection_answer2}',
      '${new_information.inspection_qustion3}',
      '${new_information.inspection_answer3}',
      '${new_information.user_id}'
    );
    `;
    const [rows, f] = await db_promisePool.query(query);

    return [rows, null];
  } catch (e) {
    return [null, e];
  }
}

module.exports = {
  getone,
  getall,
  addone,
};
