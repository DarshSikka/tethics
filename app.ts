import express from "express";
const app: express.Application = express();
const path = require("path");
const stat: string = path.join(__dirname, "static");
app.use(express.static(stat));
const port: string | number = process.env.PORT || 9000;
app.get("/", (req, res) => {
  res.sendFile(stat + "/index.html");
});
app.listen(port, (): void => console.log(`listening on port ${port}`));
