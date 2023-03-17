import React from 'react';
// import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import {
  createBrowserRouter, Link, RouterProvider
} from "react-router-dom";
import CreateView from './views/CreateView';
import DetailView from './views/DetailView';
import ListView from './views/ListView';
import LoginView from './views/LoginView';
import LogoutView from './views/LogoutView';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


const httpLink = createHttpLink({
  uri: 'http://localhost:8000/gql/',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ListView />
      ,
    }, ,
    {
      path: "/login",
      element: <LoginView />,
    },
    {
      path: "/logout",
      element: <LogoutView />,
    },
    {
      path: "/messages/create/",
      element: <CreateView />
    },
    {
      path: "/messages/:id/",
      element: <DetailView />
    }
  ]);
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </div>

  );
}

export default App