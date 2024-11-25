const express = require("express");
const mapnik = require("@mapnik/mapnik");
const path = require("path");
const { getMapPool } = require("./map-pool");

mapnik.register_default_fonts();
mapnik.register_default_input_plugins();

const app = express();
const port = 3000;

const gdalMapPool = getMapPool(path.resolve("test/gdal_map.xml"));
const pgMapPool = getMapPool(path.resolve("test/pg_map.xml"));
const shpMapPool = getMapPool(path.resolve("test/shp_map.xml"));

app.get("/", (req, res) => {
  res.send("Hello World, express & mapnik!");
});

app.get("/genpg", async (req, res) => {
  const map = await pgMapPool.acquire();
  map.zoomAll();
  const im = new mapnik.Image(4*256,4*256);
  map.render(im, function (err, im) {
    im.encode("png", function (err, buffer) {
      if (err) throw err;
      res.type('png');
      res.send(buffer);
      pgMapPool.release(map);
    });
  });
});

app.get("/gengdal", async (req, res) => {
  const map = await gdalMapPool.acquire();
  map.zoomAll();
  const im = new mapnik.Image(4*256,4*256);
  map.render(im, function (err, im) {
    im.encode("png", function (err, buffer) {
      if (err) throw err;
      res.type('png');
      res.send(buffer);
      gdalMapPool.release(map);
    });
  });
});

app.get("/genshp", async (req, res) => {
  const map = await shpMapPool.acquire();
  map.zoomAll();
  const im = new mapnik.Image(4*256,4*256);
  map.render(im, function (err, im) {
    im.encode("png", function (err, buffer) {
      if (err) throw err;
      res.type('png');
      res.send(buffer);
      shpMapPool.release(map);
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
