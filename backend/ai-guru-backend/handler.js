'use strict';
import { LexRuntimeV2Client, RecognizeTextCommand } from '@aws-sdk/client-lex-runtime-v2';

export async function chatbot(event) {

  const message = JSON.parse(event.body).message;
  if (!message) return { statusCode: 400, body: 'message cannot be empty' };
  try {
    const response = await sendMessageToLex(message);
    return createResponse(200, JSON.stringify(response));
  }
  catch (ex) {
    console.error('lex error: ', ex);
    return createResponse(500, JSON.stringify(ex, null, 2));
  }
}


async function sendMessageToLex(message) {

  const client = new LexRuntimeV2Client(
    {
      region: process.env.REGION || 'us-east-1',
      credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY
      }
    });
  const command = new RecognizeTextCommand({
    botAliasId: process.env.botAliasId,
    botId: process.env.botId,
    text: message,
    sessionId: 'test-session-id',
    localeId: 'en_US'
  });

  const response = await client.send(command);
  console.log('lex client response: ', response);
  return response;

}

function addCorsHeadersToResponse(response) {
  // TODO: limit the headers.
  // TODO: limit the CORS request origins.
  response.headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  };
}

function createResponse(statusCode, body) {
  const response = { statusCode, body };
  addCorsHeadersToResponse(response);
  return response;
}
