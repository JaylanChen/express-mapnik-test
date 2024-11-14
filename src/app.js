const express = require("express");
const mapnik = require("@mapnik/mapnik");
const path = require("path");
const fs = require("fs");

mapnik.register_default_fonts();
mapnik.register_default_input_plugins();

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World, express & mapnik!");
});

app.get("/map", (req, res) => {
  const imagePath = path.resolve("test/map.png");
  res.sendFile(imagePath);
});

app.get("/generate", (req, res) => {
  const map = new mapnik.Map(256, 256);
  const xmlPath = path.resolve("test/map.xml");
  map.load(xmlPath, function (err, map) {
    console.log(err);
    map.zoomAll();
    const im = new mapnik.Image(256, 256);
    map.render(im, function (err, im) {
      im.encode("png", function (err, buffer) {
        const imagePath = path.resolve("test/map.png");
        fs.writeFileSync(imagePath, buffer);
        res.sendFile(imagePath);
      });
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
