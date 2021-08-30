// Admin.ts contains code for administration of the website by teachers
// Import modules
import express, { Router } from "express";
import { Notice } from "../models/Notice";
import { Admission, Student } from "../models/Admission";
import { sendMail } from "./Mail";
import * as fs from "fs";
import * as path from "path";

// Make a router for using in main file app.ts
const router = Router();

// Handle updates section, so that teachers can add a new update
router.post("/update", async (req: express.Request, res: express.Response) => {
  const { username, password } = req.body;
  if (
    username === process.env.UPDATES_USER &&
    password === process.env.UPDATES_PASSWORD
  ) {
    res.render("notices");
  } else {
    res.render("plain-message", {
      message: "Invalid Credentials",
    });
  }
});

// Provide UI for uploading notices, verify it with a password that needs to be sent from upload-login
router.post("/upload-notice", (req, res) => {
  const { title, password, file, description } = req.body;
  if (password !== process.env.UPDATES_PASSWORD) {
    res.render("plain-message", {
      message: "Invalid Password",
    });
  } else {
    const ntc = new Notice({
      title,
      password,
      description,
    });
    // Make buffer and save file to file system
    const regex = /^data:.+\/(.+);base64,(.*)$/;
    const matches = file.match(regex);
    const ext = matches[1];
    const data = matches[2];
    const buffer = Buffer.from(data, "base64");
    fs.writeFileSync(
      path.join(__dirname, `../media/attachments/${ntc._id}.${ext}`),
      buffer
    );
    ntc.attachment = `/attachments/${ntc._id}.${ext}`;
    ntc.save();
    res.render("plain-message", {
      message: "Saved",
    });
  }
});
//Provide static login UI
router.get("/update-login", (req, res) => {
  res.render("update-login");
});

// Admissions UI
router.post(
  "/admission",
  async (req: express.Request, res: express.Response) => {
    const { username, password } = req.body;
    console.log(
      username === process.env.ADMISSION_USER,
      password === process.env.ADMISSION_PASSWORD
    );
    if (
      username === process.env.ADMISSION_USER &&
      password === process.env.ADMISSION_PASSWORD
    ) {
      const resp: Array<Student> = await Admission.find({});
      res.render("admissions-admin", {
        admissions: resp,
      });
    } else {
      res.send("Login is unsuccessful");
    }
  }
);

//admissions login
router.get("/login", (req, res) => {
  res.render("admin-login");
});

//catch resolve admission action from /admission page
router.post("/resolveadmission", (req, res) => {
  const { student_email, student_phone } = req.body;
  Admission.findOneAndDelete(
    { student_email, student_phone },
    {},
    (err, result) => {
      /* Send real mail to students email id
        Mailing code comes from Mail.ts
        */
      sendMail(
        student_email,
        "<h1>You have been selected for tethics excellence academy admission! Contact admission@tethicsacademy.com for more information</h1>",
        "Tethics Excellence Academy Selection"
      ).then(() => {
        console.log("Mail sent");
        res.render("plain-message", {
          message: "A mail has been sent to selected student",
        });
      });
    }
  );
});
export default router;
