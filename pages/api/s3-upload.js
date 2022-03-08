// pages/api/s3-upload.js
import { APIRoute } from "next-s3-upload";
const { v4: uuidv4 } = require("uuid");

export default APIRoute.configure({
  key(req, filename) {
    console.log("req ::", req);
    const fileFormat = filename.slice(-3, filename.length).toUpperCase();
    const name = `${uuidv4()}.${fileFormat}`;
    console.log("filename.toUpperCase() ::");
    return `test/${name}`;
  },
});
