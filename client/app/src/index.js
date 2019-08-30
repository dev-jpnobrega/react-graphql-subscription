import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';

import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

import { Router, Route } from 'react-router-dom';
import configureHistory from "./scripts/configureHistory";

import { InMemoryCache } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

import './index.css';
import App from './App';
import ChatRoom from './components/chat-room'

// Create an http link:
const httpLink = new HttpLink({
    uri: 'http://10.11.134.185:8082/graphql'
  });
  
  // Create a WebSocket link:
const wsLink = new WebSocketLink({
    uri: `ws://10.11.134.185:8082/`,
    options: {
      reconnect: true,
      connectionCallback: (result) => {
        console.warn('result connection', result)
      },
      
    }
});
  
// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);
  
const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
});

const history = configureHistory()
const Container = () => {
    return (
      <Router history={history}>        
          <ApolloProvider client={client}>      
              
              <div>
                <Route exact path="/" component={App} />
                <Route path="/chat-room/:chatId" component={ChatRoom}  />
              </div>               
         
          </ApolloProvider>
          </Router>
    )
}

ReactDOM.render(<Container />, document.getElementById('root'));
registerServiceWorker();
