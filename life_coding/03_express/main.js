const fs = require("fs");
const express = require("express");
const compress = require("compression");
const helmet = require('helmet');
const indexRouter = require("./routes/index");
const topicRouter = require("./routes/topic");
const PORT = 3000;
const app = express();

app.use(helmet());



app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(compress());
app.get("*", (req, res, next) => {
  fs.readdir("./data", function (error, filelist) {
    if (error) throw error;
    req.list = filelist;
    console.log(req.list);
    next();
  });
});

app.use("/", indexRouter);
app.use("/topic", topicRouter);

app.use((req, res, next) => {
  res.status(404).send("404 not found");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
