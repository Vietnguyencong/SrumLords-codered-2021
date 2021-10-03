const express = require("express");
const cors = require("cors");
const router = express.Router();
const usersService = require("../services/usersService");

router.get("/allusers", async function (req, res, next) {
  try {
    res.header("Access-Control-Expose-Headers", "X-Total-Count");
    count = Object.keys(await usersService.get(req.query.page)).length;
    res.set("X-Total-Count", count);
    res.setHeader("Content-Range", count);
    res.json(await usersService.get(req.query.page));
  } catch (err) {
    console.error(`Get error `, err.message);
    next(err);
  }
});

router.get("/one/:id", async function (req, res, next) {
  let id = req.params.id;
  console.log(`id is ${id}`);
  try {
    res.json(await usersService.getUser(id));
  } catch (err) {
    console.error(`Get error `, err.message);
    next(err);
  }
});

router.post("/", async function (req, res, next) {
  console.log("Create user /");
  try {
    res.json(await usersService.create(req.body));
  } catch (err) {
    console.error(`Error while creating new user`, err.message);
    next(err);
  }
});

router.get("/getonebymail/:email", async function (req, res) {
  let id = req.params.email;
  const [data, e] = await usersService.getUserByEmail(id);
  return data ? res.json({ data: data[0] }) : res.json({ message: e });
});

module.exports = router;
