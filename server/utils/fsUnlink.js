const fs = require("fs");

exports.fsUnlink = (avatar) => {
  const filePath = __dirname + `/../uploads/avatar/${avatar}`;
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log("No se pudo eliminar el avatar");
    }
  });
}