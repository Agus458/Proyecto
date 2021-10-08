import multer from "multer";
import path from "path";
import fs from "fs";
import  baseDir  from "../app.server";

export const perfilStorage = () => {
    return multer.diskStorage({
        destination: (request, file, callback) => {
            if (file.mimetype == "image/jpeg") {
                return callback(null, "uploads/perfil/imagenes");
            } else {
                if (file.mimetype == "application/pdf") {
                    return callback(null, "uploads/perfil/documentos");
                }
            }

            return;
        },

        filename: (request, file, callback) => {
            return callback(null, request.user.id + '-' + Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
        }
    });
}

export const removerArchivo = (relativePath: string) => {
    fs.unlinkSync(path.join(baseDir + "/../../" + relativePath));
}