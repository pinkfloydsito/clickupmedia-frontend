import React from 'react';
import { Route, Switch, } from 'react-router-dom';
import { StoresList, StoresEdit,
         CategoriesList, CategoriesEdit,
         ProductsList, ProductsEdit,
       } from "./pages";

import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, } from "react-router-dom";
import Header from './components/header'

const App = () => {
  return (
    <Router>
      <Header/>
      <Switch>
         <Route path="/stores">
            <StoresList />
          </Route>

         <Route path="/categories">
            <CategoriesList />
          </Route>

         <Route path="/products">
            <ProductsList />
          </Route>
      </Switch>
    </Router>
  )
}

export default App;
