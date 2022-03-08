const express = require("express");
const router = express.Router();
// const mysql = require('sync-mysql');
// const database = require('../config/database.js');
// const connection = new mysql(database);
const { verifyToken } = require("../utils/authorization");
// const { Translate } = require('@google-cloud/translate').v2;
const request = require("sync-request");
const naverPapago = require("../config/naver-papago-api");
// const mysqlHelper = require("./middlewares/mysql-helper");

/* GET api listing. */
router.post("/translate", verifyToken, function (req, res, next) {
  const { englishName } = req.body;
  console.log("englishName :: ", englishName);

  // Papago API
  const temp = [];
  temp.push("source=en");
  temp.push("target=ko");
  temp.push("text=" + englishName);

  const formData = temp.join("&");
  console.log("formData :: ", formData);

  const response = request("POST", naverPapago.url, {
    headers: {
      "X-NCP-APIGW-API-KEY-ID": naverPapago.clientID,
      "X-NCP-APIGW-API-KEY": naverPapago.clientSecret,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData,
  });
  console.log("response.statusCode ::", response.statusCode);
  if (response.statusCode !== 200) {
    res.send({ koreanName: englishName }); // 번역 실패.
    return;
  }

  const responseBody = response.getBody("utf8");
  // console.log('responseBody :: ', responseBody);
  const payload = JSON.parse(responseBody);
  console.log("payload :: ", payload);
  const translatedText = payload.message.result.translatedText;
  res.send({ koreanName: translatedText }); // 번역 실패.
});

module.exports = router;
