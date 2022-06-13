import React from 'react';

import PropTypes from 'prop-types';
import './style.css';
import { getSvg } from './messageBox.js';
import { Auth } from 'aws-amplify';



class LexChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: 'open'
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    document.getElementById('inputField').focus();
  }

  pushChat(event) {
    event.preventDefault();

    var inputFieldText = document.getElementById('inputField');

    if (inputFieldText && inputFieldText.value && inputFieldText.value.trim().length > 0) {

      // disable input to show we're sending it
      var inputField = inputFieldText.value.trim();
      inputFieldText.value = '...';
      inputFieldText.locked = true;

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


async function sendMessageToLex(message, successCb, errorCb, finallyCb) {
  const token = (await Auth.currentSession()).getIdToken().getJwtToken();
  
  console.log('token is: ', token);
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + token);

  var raw = JSON.stringify({
    message
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch('https://b1mbfbmkfj.execute-api.us-east-1.amazonaws.com/dev/', requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result);
      successCb(result);
    })
    .catch(error => {
      console.log('error', error);
      errorCb();
    })
    .finally(() => finallyCb());
}


export default LexChat;


