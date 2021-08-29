import express from "express";
import { connect } from "mongoose";
import * as mongoose from "mongoose";
import { config } from "dotenv";
import ejsLayouts from "express-ejs-layouts";
import { Admission, Student } from "./models/Admission";
import AdminController from "./controllers/Admin";
import { Notice } from "./models/Notice";
config();
const options: mongoose.ConnectOptions = {};
connect(process.env.DB_URI || "", options, (err) => {
  if (err) console.error(err);
  console.log("Connected to mongoose");
});
const app: express.Application = express();
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static("media"));
app.use(ejsLayouts);
app.use("/admin", AdminController);
app.set("view engine", "ejs");
const path = require("path");
const stat: string = path.join(__dirname, "static");
app.use(express.static(stat));
const port: string | number = process.env.PORT || 9000;
app.get("/", (req: express.Request, res: express.Response) => {
  res.sendFile(stat + "/index.html");
});
app.get("/updates", async (req: express.Request, res: express.Response) => {
  const notices = await Notice.find({});
  res.render("updates", { updates: notices });
});
app.get("/facilities", (req: express.Request, res: express.Response) => {
  res.sendFile(stat + "/facilities.html");
});
app.get("/update/:id", async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const ntc = await Notice.findOne({ id });
  res.render("notice-view", {
    notice: ntc,
  });
});
app.post("/admission", (req: express.Request, res: express.Response) => {
  const { name, email, phone, grade } = req.body;
  const creds: Student = { name, email, phone, grade };
  const admission = new Admission(creds);
  admission.save((err) => {
    console.log(err);
    if (err) {
      res.render("plain-message", {
        message: "Sorry, the data you entered is invalid",
      });
    } else {
      res.render("plain-message", {
        message: "Your response was successfuly recorded and will be seen to",
      });
    }
  });
});
app.get("*", (req: express.Request, res: express.Response) => {
  res.sendFile(stat + "/404.html");
});
app.listen(port, (): void => console.log(`listening on port ${port}`));
