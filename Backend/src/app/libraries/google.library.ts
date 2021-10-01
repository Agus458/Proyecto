import { OAuth2Client } from "google-auth-library";

export const verifyGoogleIdToken = async (idToken: "string"): Promise<boolean> => {
    try {
        const client = new OAuth2Client(process.env.CLIENT_ID);
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.CLIENT_ID
        });
        return true;
    } catch (error) {

    }

    return false;
}