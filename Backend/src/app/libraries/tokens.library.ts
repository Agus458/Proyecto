import jwt from "jsonwebtoken";
import moment from "moment";

export const createToken = (email: string): { token: string, exp: number } => {
    return {
        token: jwt.sign({ email }, process.env.SECRET as string, { expiresIn: "1d" }),
        exp: moment().add(1, "day").valueOf()
    };
}