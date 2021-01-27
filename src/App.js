import React from 'react';
import { Route, Switch, Redirect, } from 'react-router-dom';
import { StoresRoot,
         CategoriesRoot,
         ProductsRoot,
       } from "./pages";

import 'react-redux-notify/dist/ReactReduxNotify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, } from "react-router-dom";
import Header from './components/header'

const App = () => {
  return (
    <>
      <Router>
        <Header/>
        <Switch>
          <Redirect exact from="/stores" to="/stores/list" />
          <Redirect exact from="/categories" to="/categories/list" />
          <Redirect exact from="/products" to="/products/list" />
           <Route path="/stores">
              <StoresRoot />
            </Route>

           <Route path="/categories">
              <CategoriesRoot />
            </Route>

           <Route path="/products">
              <ProductsRoot />
            </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App;
