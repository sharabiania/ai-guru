import React from 'react';
import { LexRuntimeV2Client, RecognizeTextCommand } from '@aws-sdk/client-lex-runtime-v2';

import PropTypes from 'prop-types';
import 'aws-sdk';
import './style.css';
import AWS from 'aws-sdk';
import { getSvg } from './messageBox.js';



class LexChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: '',
      // lexUserId: 'chatbot-demo' + Date.now(),
      // sessionAttributes: {},
      visible: 'open'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    document.getElementById('inputField').focus();
    AWS.config.region = this.props.region || 'us-east-1';
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: this.props.IdentityPoolId,
    });
    AWS.config.update({
      // accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      // accessSecretKey: process.env.AWS_SECRET_ACCESS_KE,
    });


    // TODO fix 
    // AWS.config.credentials.accessKeyId = '';
    // AWS.config.credentials.secretAccessKey = '';
    // console.log('aws', AWS.config);
    var lexruntime = new AWS.LexRuntime();
    this.lexruntime = lexruntime;

  }

  pushChat(event) {
    event.preventDefault();

    var inputFieldText = document.getElementById('inputField');

    if (inputFieldText && inputFieldText.value && inputFieldText.value.trim().length > 0) {

      // disable input to show we're sending it
      var inputField = inputFieldText.value.trim();
      inputFieldText.value = '...';
      inputFieldText.locked = true;

      // send it to the Lex runtime
      console.log('bot name: ', this.props.botName);

      this.showRequest(inputField);

      sendMessageToLex(
        inputField,
        res => {
          console.log('test res: ', res);
          this.showResponse(res?.messages);
          this.setState({ sessionAttributes: res?.sessionAttributes });
        },
        err => this.showError(err),
        () => {
          // re-enable input
          inputFieldText.value = '';
          inputFieldText.locked = false;
        });

    }
    // we always cancel form submission
    return false;
  }

  showRequest(daText) {
    var conversationDiv = document.getElementById('conversation');
    var requestPara = document.createElement('P');

    requestPara.className = 'userRequest';
    // requestPara.innerHTML += '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 20" width="24" height="20" fill="currentColor" align="left" role="presentation" class="BubbleText__StyledTail-sc-1bng39n-1 fWWbHc"></svg>';
    const svg = getSvg();
    requestPara.appendChild(svg);
    requestPara.appendChild(document.createTextNode(daText));
    conversationDiv.appendChild(requestPara);
    conversationDiv.scrollTop = conversationDiv.scrollHeight;

  }

  showError(daText) {

    var conversationDiv = document.getElementById('conversation');
    var errorPara = document.createElement('P');
    errorPara.className = 'lexError';
    errorPara.appendChild(document.createTextNode(daText));
    conversationDiv.appendChild(errorPara);
    conversationDiv.scrollTop = conversationDiv.scrollHeight;
  }

  showResponse(messages) {
    console.log('messages: ', messages);
    var conversationDiv = document.getElementById('conversation');
    var responsePara = document.createElement('P');
    responsePara.className = 'lexResponse';
    if (messages && messages.length) {
      for (const msg of messages) {
        console.log('msg: ', msg);
        responsePara.appendChild(document.createTextNode(msg.content));
        responsePara.appendChild(document.createElement('br'));
      }
    }
    if (messages?.dialogState === 'ReadyForFulfillment') {
      responsePara.appendChild(document.createTextNode(
        'Ready for fulfillment'));
      // TODO:  show slot values
    } else {
      responsePara.appendChild(document.createTextNode(
        ''));
    }
    conversationDiv.appendChild(responsePara);
    conversationDiv.scrollTop = conversationDiv.scrollHeight;
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ data: event.target.value });
  }

  render() {


    const chatcontainerStyle = {
      backgroundColor: '#FFFFFF',
      width: '100%',
      overflowY: 'scroll'
    };




    return (
      <div id="chatwrapper">

        <div id="chatcontainer" className={this.state.visible} style={chatcontainerStyle}>
          <div id="conversation"></div>
          <form id="chatform" onSubmit={this.pushChat.bind(this)}>
            <input type="text"
              id="inputField"
              size="40"
              value={this.state.data}
              placeholder={this.props.placeholder}
              onChange={this.handleChange.bind(this)}
            />
          </form>
        </div>
      </div>
    );
  }
}

LexChat.propTypes = {
  region: PropTypes.string,
  IdentityPoolId: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  botName: PropTypes.string,
};


async function sendMessageToLex(message, successCb, errorCb, finalCb) {
  console.log('testing lex...');
  // AWS.config.update({
  //   region: 'us-east-1',
  //   accessKeyId: 'ASIASLT4HKWPMB5T7BTA',
  //   secretKey: 'JY+tb65ZyX3d1CrbajqnILaJUgbpoH5ygKXi3rlz',
  //   credentials: new AWS.CognitoIdentityCredentials({
  //     IdentityPoolId: 'us-east-1:f7d7473b-db84-4a3c-95ad-225ab9aeb1e7'
  //   })
  // });
  const client = new LexRuntimeV2Client(
    {
      region: 'us-east-1',
      credentials: {
        accessKeyId: 'AKIASLT4HKWPB3NEMJPV',
        secretAccessKey: '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'
      }
    });
  const command = new RecognizeTextCommand({
    botAliasId: 'IVHQZKP46J',
    botId: 'L2ZJJFS9AT',
    text: message,
    sessionId: 'test-session-id',
    localeId: 'en_US'
  });

  try {
    const response = await client.send(command);
    console.log('response: ', response);
    successCb(response);
    // process data.
  } catch (error) {
    // error handling.
    console.error('error: ', error);
    errorCb();
  } finally {
    finalCb();
  }
}


export default LexChat;


