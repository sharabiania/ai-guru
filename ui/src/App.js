import React from 'react';
import { PropTypes } from 'prop-types';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
// import awsExports from './aws-exports';

import '@aws-amplify/ui-react/styles.css';
import LexChat from '../src/components/chatbot';
import AGLayout from './Layout';
import './App.css';
import AGProfileCard from './components/profileCard';

Amplify.configure({
  aws_cognito_region: 'us-east-1', // (required) - Region where Amazon Cognito project was created
  aws_user_pools_id: 'us-east-1_PBjPybbnv', // (optional) -  Amazon Cognito User Pool ID
  aws_user_pools_web_client_id: '1fk90rr7h68prkj494hb33rr9c', // (optional) - Amazon Cognito App Client ID (App client secret needs to be disabled)
  // aws_cognito_identity_pool_id: 'us-east-1:f602c14b-0fde-409c-9a7e-0baccbfd87d0', // (optional) - Amazon Cognito Identity Pool ID
  // aws_mandatory_sign_in: 'enable'
});

function App({ signOut, user }) {
  console.log('user is: ', user);
  console.log('signOut is: ', signOut);
  return (
    <AGLayout>
      <Authenticator signUpAttributes={[
        'address',
        'birthdate',
        // 'email',
        'family_name',
        'gender',
        'given_name',
        'name',
        'picture',
        
      ]}>
        {({ signOut, user }) => (
          <main>
            <h1>Hello {user.username}</h1>
            <button onClick={signOut}>Sign out</button>
            <button onClick={signOut}>Sign out</button>
            <AGProfileCard username={user.username} />
          </main>
        )}
      </Authenticator>
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <LexChat
            botName="shara-bot"
            // us-east-1:6a5d7008-a9d4-438c-99b6-e40a2b35508a
            // us-east-1:f7d7473b-db84-4a3c-95ad-225ab9aeb1e7
            // us-east-1:6a5d7008-a9d4-438c-99b6-e40a2b35508a
            IdentityPoolId="us-east-1:f7d7473b-db84-4a3c-95ad-225ab9aeb1e7"
            placeholder="How can I help?"
            style={{ position: 'relative' }}
            backgroundColor="white"
            height="100vh"
            region="us-east-1"
            headerText="Chat with Guru" />
        </header>
      </div>
    </AGLayout>
  );
}

App.propTypes = {
  signOut: PropTypes.object,
  user: PropTypes.string,
};

export default App;
