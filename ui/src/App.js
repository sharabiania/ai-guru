import logo from './logo.svg';
import './App.css';
import LexChat from '../src/components/chatbot';
import AGLayout from './Layout';

function App() {
  return (
    <AGLayout>
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <LexChat 
            botName="shara-bot"
              //us-east-1:6a5d7008-a9d4-438c-99b6-e40a2b35508a
              //us-east-1:f7d7473b-db84-4a3c-95ad-225ab9aeb1e7
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

export default App;
