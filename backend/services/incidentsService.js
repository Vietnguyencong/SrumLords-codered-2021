const { db_promisePool } = require("../utils/mysql_conn");

async function get() {
  const query = `SELECT * FROM incidents;`;
  const [rows, fields] = await db_promisePool.query(query);
  var ndata = JSON.parse(JSON.stringify(rows).split('"id":').join('"id":'));
  return ndata;
}

async function getincidents(id) {
  const user = `Select * from incidents where id=${id}`;
  const [rows, fields] = await db_promisePool.query(user);
  var ndata = JSON.parse(JSON.stringify(rows).split('"id":').join('"id":'));
  return ndata[0];
}

async function create(incidents) {
  console.log(incidents);
  const result = await db_promisePool.query(
    `INSERT INTO incidents 
      ( current_job, manager, phone_number, email, witness, phone_number_witness, incident_date, report_date, incident_description, user_id, location) 
      VALUES 
      (?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)`,
    [
      incidents.current_job,
      incidents.manager,
      incidents.phone_number,
      incidents.email,
      incidents.witness,
      incidents.phone_number_witness,
      incidents.incident_date,
      incidents.report_date,
      incidents.incident_description,
      incidents.user_id,
      incidents.location,
    ]
  );
  message = `Maybe new incident was created successfully`;
}

async function getlocation() {
  const query = `SELECT location, count(location) as number FROM incidents Group by location;`;
  const [rows, fields] = await db_promisePool.query(query);

  var result = [];
  result.push(["Location", "Number"]);

  for (var i = 0; i < rows.length; i++) {
    var obj = rows[i];
    const res = [];
    const keys = Object.keys(obj);
    for (let j = 0; j < keys.length; j++) {
      const key = keys[j];
      res.push(obj[key]);
    }

    result.push(res);
  }
  console.log(result);

  return result;

  return rows;
}

async function getJobs() {
  const query = `SELECT current_job, count(current_job) from uhredcode.incidents group by current_job;`;
  const [rows, fields] = await db_promisePool.query(query);

  var result = [];
  result.push(["Job", "Count"]);

  for (var i = 0; i < rows.length; i++) {
    var obj = rows[i];
    const res = [];
    const keys = Object.keys(obj);
    for (let j = 0; j < keys.length; j++) {
      const key = keys[j];
      res.push(obj[key]);
    }

    result.push(res);
  }
  console.log(result);

  return result;

  return rows;
}

module.exports = {
  get,
  getincidents,
  create,
  getlocation,
  getJobs,
};
