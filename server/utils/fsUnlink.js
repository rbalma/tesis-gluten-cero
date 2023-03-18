import fs from "fs";

export const fsUnlink = (imagePath) => {
  const filePath = __dirname + `/../uploads${imagePath}`;
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log("No se pudo eliminar la imagen");
    }
  });
}