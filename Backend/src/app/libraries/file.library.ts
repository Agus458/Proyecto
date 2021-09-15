import multer from "multer";
import path from "path";

export const perfilStorage = () => {
    return multer.diskStorage({
        destination: (request, file, callback) => {
            if (file.mimetype == "image/jpeg") {
                callback(null, "uploads/perfil/imagenes");
            } else {
                if (file.mimetype == "application/pdf") {
                    callback(null, "uploads/perfil/cvs");
                }
            }
        },

        filename: (request, file, callback) => {
            callback(null, request.user.id + '-' + Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
        }
    });
}