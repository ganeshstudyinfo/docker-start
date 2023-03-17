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
import { BatchHttpLink } from "apollo-link-batch-http";


const client = new ApolloClient({
  link: BatchHttpLink({
    uri: 'http://localhost:8000/gql/'
  }),
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