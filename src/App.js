import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Home from './components/home/Home';
import Category from './components/category/Category';
import Orders from './components/order/Orders';
import Products from './components/product/Products';
import Users from './components/user/Users';
import Login from './components/login/Login';
import Register from './components/register/Register';
import AddCategory from "./components/category/AddCategory";
import AddProduct from "./components/product/AddProduct";

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/category" component={Category}/>
            <Route path="/order" component={Orders}/>
            <Route path="/product" component={Products}/>
            <Route path="/user" component={Users}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route path="/addcategory" component={AddCategory}/>
            <Route path="/addproduct" component={AddProduct}/>
          </Switch>
        </Router>
    );
  }
}

export default App;
