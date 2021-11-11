import { DeepPartial } from "typeorm";
import { Novedad } from "../../src/app/models/novedad.model";

export const novedades: DeepPartial<Novedad>[] = [
    {
        titulo: "Nueva Novedad",
        contenido: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ligula arcu, varius id dui at, elementum iaculis purus. Mauris in consectetur diam. In id ipsum finibus est lacinia tempus at id felis. Donec fermentum lorem a congue lobortis. Morbi facilisis dui a leo condimentum euismod.",
    },
    {
        titulo: "Nuevo",
        contenido: "Ut imperdiet vitae eros et interdum. Duis justo enim, lacinia in odio nec, congue varius lorem. Integer quis varius tellus. Integer sed aliquet nisi.",
    }
];