import { GOOGLE_CLIENT_ID, GOOGLE_SECRET_ID } from '../config/config.js';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client( GOOGLE_CLIENT_ID, GOOGLE_SECRET_ID,
  'postmessage');

export async function googleVerify( code = '' ) {

  const { tokens } = await client.getToken(code); // exchange code for tokens

  const ticket = await client.verifyIdToken({
    idToken: tokens.id_token,
    audience: GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
});

//name 
const { given_name, family_name, picture, email } = ticket.getPayload();

return { given_name, family_name, picture, email }

}