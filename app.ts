// app.ts is the main file which starts the server process and maintains the get routes, also handling some post routes

//import modules
import express from "express";
import { connect } from "mongoose";
import * as mongoose from "mongoose";
import { config } from "dotenv";
import ejsLayouts from "express-ejs-layouts";
import { Admission, Student } from "./models/Admission";
import AdminController from "./controllers/Admin";
import { Notice } from "./models/Notice";
// configure dotenv for development mode
config();

//setup mongodb with mongoose
const options: mongoose.ConnectOptions = {};
connect(process.env.DB_URI || "", options, (err) => {
  if (err) console.error(err);
  console.log("Connected to mongoose");
});

//setup express app to handle form post requests
const app: express.Application = express();
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(express.static("media"));

// setup ejs and use the admin controller routes created in controllers/Admin.ts
app.use(ejsLayouts);
app.use("/admin", AdminController);
app.set("view engine", "ejs");

//import path with required function
const path = require("path");

// use static HTML/CSS/JS files
const stat: string = path.join(__dirname, "static");
app.use(express.static(stat));

// configure port to listen express app
const port: string | number = process.env.PORT || 9000;

// send index.html in base root
app.get("/", (req: express.Request, res: express.Response) => {
  res.sendFile(stat + "/index.html");
});

// send updates.ejs in /updates
app.get("/updates", async (req: express.Request, res: express.Response) => {
  let { filter } = req.query;
  if (!filter) filter = "";
  let notices = await Notice.find({});
  notices = notices.filter((ele) =>
    ele.title.toUpperCase().includes(String(filter).toUpperCase())
  );
  res.render("updates", {
    updates: notices,
  });
});

// send facilities.html in /dacilities
app.get("/facilities", (req: express.Request, res: express.Response) => {
  res.sendFile(stat + "/facilities.html");
});

//handle dynamic update root
app.get("/update/:id", async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const ntc = await Notice.findOne({ _id: id }).catch(() => {
    res.sendFile(stat + "/404.html");
  });
  if (!ntc) {
    res.sendFile("404.html");
  }
  res.render("notice-view", {
    notice: ntc,
  });
});

//handle admission forms posted by student
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

// use 404 page
app.get("*", (req: express.Request, res: express.Response) => {
  res.sendFile(stat + "/404.html");
});

// start express app
app.listen(port, (): void => console.log(`listening on port ${port}`));
