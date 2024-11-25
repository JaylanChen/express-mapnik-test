
const genericPool = require("generic-pool");
const mapnik = require("@mapnik/mapnik");
const { pid } = require('node:process');

exports.getMapPool = (mapXmlPath) => {
  const map_factory = {
    create: function () {
      const map = new mapnik.Map(4 * 256, 4 * 256);
      map.loadSync(mapXmlPath);
      console.log(`--> Load Map pid:${pid} xml:${mapXmlPath}`);
      return map;
    },
    destroy: function (map) {
      delete map;
      console.log(`<-- Destroy Map ${pid}`);
    },
  };

  const opts = {
    max: 6,
    min: 2,
  };

  const pool = genericPool.createPool(map_factory, opts);
  return pool;
};
