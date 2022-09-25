const fs = require("fs");

exports.fsUnlink = (imagePath) => {
  const filePath = __dirname + `/../uploads${imagePath}`;
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log("No se pudo eliminar la imagen");
    }
  });
}