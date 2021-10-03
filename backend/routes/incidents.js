const express = require("express");
const cors = require("cors");
const router = express.Router();
const incidentsService = require("../services/incidentsService");

router.get("/allincidents", async function (req, res, next) {
  try {
    res.header("Access-Control-Expose-Headers", "X-Total-Count");
    count = Object.keys(await incidentsService.get(req.query.page)).length;
    res.set("X-Total-Count", count);
    res.setHeader("Content-Range", count);
    res.json(await incidentsService.get(req.query.page));
  } catch (err) {
    console.error(`Get error `, err.message);
    next(err);
  }
});

router.get("/one/:id", async function (req, res, next) {
  let id = req.params.id;
  console.log(`id is ${id}`);
  try {
    res.json(await incidentsService.getincidents(id));
  } catch (err) {
    console.error(`Get error `, err.message);
    next(err);
  }
});

router.post("/", async function (req, res, next) {
  console.log("Create incidents /");
  try {
    console.log("rea, body", req.body);
    res.json(await incidentsService.create(req.body));
  } catch (err) {
    console.error(`Error while creating new incidents`, err.message);
    next(err);
  }
});

router.get("/alllocations", async function (req, res, next) {
  try {
    res.header("Access-Control-Expose-Headers", "X-Total-Count");
    count = Object.keys(
      await incidentsService.getlocation(req.query.page)
    ).length;
    res.set("X-Total-Count", count);
    res.setHeader("Content-Range", count);
    res.json(await incidentsService.getlocation(req.query.page));
  } catch (err) {
    console.error(`Get error `, err.message);
    next(err);
  }
});

router.get("/alljobs", async function (req, res, next) {
  try {
    res.header("Access-Control-Expose-Headers", "X-Total-Count");
    count = Object.keys(await incidentsService.getJobs(req.query.page)).length;
    res.set("X-Total-Count", count);
    res.setHeader("Content-Range", count);
    res.json(await incidentsService.getJobs(req.query.page));
  } catch (err) {
    console.error(`Get error `, err.message);
    next(err);
  }
});

module.exports = router;
