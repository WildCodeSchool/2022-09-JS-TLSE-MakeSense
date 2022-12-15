require("dotenv").config();
const fs = require("fs");

const regex = /([A-Z])\w+/g;
const folder = "../frontend/src/pages";

const readallfiles = (req, res) => {
  res.send(
    fs.readdirSync(folder).reduce((acc, file) => {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      const namefile = file.replace(".jsx", "");
      if (fs.statSync(`${folder}/${file}`).isDirectory()) {
        const subfolder = `${folder}/${file}`.match(regex)[0];
        fs.readdirSync(`${folder}/${file}`).reduce((acc2, file2) => {
          const namesubfile = file2.replace(".jsx", "");
          /* eslint-disable no-param-reassign */
          acc2 = {
            ...acc,
            [subfolder]: { ...acc[subfolder], [namesubfile]: file2 },
          };
          acc = acc2;
          /* eslint-enable no-param-reassign */
          return acc2;
        }, {});
      } else {
        return { ...acc, [namefile]: file };
      }
      return acc;
    }, {})
  );
};

module.exports = {
  readallfiles,
};
