import fs from "fs";
import __dirname from "../dirnamePath.js";

export const fsUnlink = (imagePath) => {
  const filePath = __dirname + `/uploads${imagePath}`;
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log(`No se pudo eliminar la imagen ${imagePath}`);
    }
  });
}