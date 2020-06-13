var xml2json = require("xml2json");
var axios = require("axios");
var express = require("express");
var router = express.Router();

async function getRss(url) {
  const { data } = await axios.get(url);
  return data;
}

function rssToJson(rss) {
  return xml2json.toJson(rss);
}
router.post("/", async function (req, res, next) {
  const { url } = req.body;
  return res.send(rssToJson(await getRss(url)));
});

module.exports = router;
