const express = require("express");
let incidentsRouter = express.Router();

const { getall, getone, addone } = require("../services/inspectionService");

incidentsRouter.get("/getall", async (req, res) => {
  const [data, e] = await getall();
  console.log(data);
  return data ? res.json([{ data: data }]) : res.json({ message: e });
});

incidentsRouter.get("/one/:id", async (req, res) => {
  const id = req.params.id;
  const [data, e] = await getone(id);
  console.log(data);
  return data ? res.json({ data: data }) : res.json({ message: e });
});

incidentsRouter.post("/add", async (req, res) => {
  const new_infor = req.body;
  const [data, e] = await addone(new_infor);
  console.log(data);
  return data ? res.json({ data: data }) : res.json({ message: e });
});

module.exports = incidentsRouter;
