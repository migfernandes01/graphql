import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, HashRouter, Route, Routes } from "react-router-dom";
import App from './components/App';

// cache identifying object id's (update components using id when it changes)
const cache = new InMemoryCache({
  dataIdFromObject: object => object.id || null
});

// link for localhost
const link = new HttpLink({
 uri: 'http://localhost:4000/graphql'
})

// new apollo client
const client = new ApolloClient({
  cache,
  link
});



const Root = () => {
    return (
      <ApolloProvider client={client}>
        <HashRouter>
          <Routes>
            <Route path='/' element={<App />}>

            </Route>
          </Routes>
        </HashRouter>
      </ApolloProvider>
    );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
