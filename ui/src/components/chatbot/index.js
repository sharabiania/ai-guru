import React from 'react';
// import PropTypes from 'prop-types';
import 'aws-sdk';
import "./style.css";
import AWS from 'aws-sdk';
import {getSvg} from './messageBox.js';



class LexChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '', 
      lexUserId: 'chatbot-demo' + Date.now(), 
      sessionAttributes: {}, 
      visible: 'open'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    document.getElementById("inputField").focus();
    AWS.config.region = this.props.region || 'us-east-1';
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: this.props.IdentityPoolId,
    });
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      accessSecretKey: process.env.AWS_SECRET_ACCESS_KE,
    });

    // TODO fix 
    // AWS.config.credentials.accessKeyId = '';
    // AWS.config.credentials.secretAccessKey = '';
    // console.log('aws', AWS.config);
    var lexruntime = new AWS.LexRuntime();
    this.lexruntime = lexruntime;

  }

  handleClick() {
    // this.setState({ visible: this.state.visible == 'open'? 'closed' : 'open' });
    console.log(this.state);
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
      var params = {
        botAlias: '$LATEST',
        botName: this.props.botName,
        inputText: inputField,
        userId: this.state.lexUserId,
        sessionAttributes: this.state.sessionAttributes
      };
      this.showRequest(inputField);
      var a = function(err, data) {
        if (err) {
          console.log(err, err.stack);
          this.showError('Error:  ' + err.message + ' (see console for details)')
        }
        if (data) {
          // capture the sessionAttributes for the next cycle
          this.setState({sessionAttributes: data.sessionAttributes})
          //sessionAttributes = data.sessionAttributes;
          // show response and/or error/dialog status
          this.showResponse(data);
        }
        // re-enable input
        inputFieldText.value = '';
        inputFieldText.locked = false;
      };

      this.lexruntime.postText(params, a.bind(this));
    }
    // we always cancel form submission
    return false;
  }

  showRequest(daText) {
    var conversationDiv = document.getElementById('conversation');
    var requestPara = document.createElement("P");
   
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
    var errorPara = document.createElement("P");
    errorPara.className = 'lexError';
    errorPara.appendChild(document.createTextNode(daText));
    conversationDiv.appendChild(errorPara);
    conversationDiv.scrollTop = conversationDiv.scrollHeight;
  }

  showResponse(lexResponse) {

    var conversationDiv = document.getElementById('conversation');
    var responsePara = document.createElement("P");
    responsePara.className = 'lexResponse';
    if (lexResponse.message) {
      responsePara.appendChild(document.createTextNode(lexResponse.message));
      responsePara.appendChild(document.createElement('br'));
    }
    if (lexResponse.dialogState === 'ReadyForFulfillment') {
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
    this.setState({data: event.target.value});
  }

  render() {


    const chatcontainerStyle = {
      backgroundColor: '#FFFFFF',
      width: '100%',
      overflowY: 'scroll'
    }

   


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
    )
  }
}

LexChat.propTypes = {
  // botName: PropTypes.string,
  // IdentityPoolId: PropTypes.string.isRequired,
  // placeholder: PropTypes.string.isRequired,
  // backgroundColor: PropTypes.string,
  // height: PropTypes.number,
  // headerText: PropTypes.string
}

export default LexChat;
