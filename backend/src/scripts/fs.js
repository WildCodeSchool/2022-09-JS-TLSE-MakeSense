require("dotenv").config();
const fs = require("fs");

const regex = /[^/]+(?=\/$|$)/g;

const readallfiles = (req, res) => {
  const readFolder = (folder) => {
    return fs
      .readdirSync(folder)
      .filter((file) => file !== ".gitignore" && file !== "Error.jsx")
      .reduce((acc, file) => {
        // eslint-disable-next-line global-require, import/no-dynamic-require
        const namefile = file.replace(".jsx", "");
        if (fs.statSync(`${folder}/${file}`).isDirectory()) {
          const foldername = `${folder}/${file}`.match(regex)[0];
          let acc2 = { ...acc };
          const files2 = readFolder(`${folder}/${file}`);
          acc2 = { [foldername]: files2 };
          /* eslint-disable no-param-reassign */
          acc = { ...acc, ...acc2 };
          /* eslint-enable no-param-reassign */
          return acc;
        }
        return { ...acc, [namefile]: file };
      }, {});
  };

  const result = req.body.folders.map((e) => {
    return readFolder(e);
  });

  res.send(result);
};

module.exports = {
  readallfiles,
};
