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

app.get("/generate", (req, res) => {
  const map = new mapnik.Map(256, 256);
  const xmlPath = path.resolve("test/pg_map.xml");
  map.load(xmlPath, function (err, map) {
    console.log(err);
    map.zoomAll();
    const im = new mapnik.Image(256, 256);
    map.render(im, function (err, im) {
      const imagePath = path.resolve("test/pg_map.png");
      // im.encode("png", function (err, buffer) {
      //   fs.writeFileSync(imagePath, buffer);
      //   res.send("pg ok")
      // });
      im.save(imagePath, function (err) {
        if (err) throw err;
        // res.sendFile(imagePath);
        res.send("pg ok")
      });
    });
  });
});


app.get("/gengdal", (req, res) => {
  const map = new mapnik.Map(256, 256);
  const xmlPath = path.resolve("test/gdal_map.xml");
  map.load(xmlPath, function (err, map) {
    console.log(err);
    map.zoomAll();
    const im = new mapnik.Image(256, 256);
    map.render(im, function (err, im) {
      const imagePath = path.resolve("test/gdal_map.png");
      // im.encode("png", function (err, buffer) {
      //   fs.writeFileSync(imagePath, buffer);
      //   res.send("gdal ok")
      // });
      im.save(imagePath, function (err) {
        if (err) throw err;
        // res.sendFile(imagePath);
        res.send("gdal ok")
      });
    });
  });
});


app.get("/genshp", (req, res) => {
  const map = new mapnik.Map(256, 256);
  const xmlPath = path.resolve("test/shp_map.xml");
  map.load(xmlPath, function (err, map) {
    console.log(err);
    map.zoomAll();
    const im = new mapnik.Image(256, 256);
    map.render(im, function (err, im) {
      const imagePath = path.resolve("test/shp_map.png");
      // im.encode("png", function (err, buffer) {
      //   fs.writeFileSync(imagePath, buffer);
      //   res.send("shp ok")
      // });
      im.save(imagePath, function (err) {
        if (err) throw err;
        // res.sendFile(imagePath);
        res.send("shp ok")
      });
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
