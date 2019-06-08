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
import SignIn from './components/signin/SignIn';
import SignUp from './components/signup/SignUp';
import AddCategory from "./components/category/AddCategory";
import AddProduct from "./components/product/AddProduct";
import AddOrder from "./components/order/AddOrder";
import ErrorComponent from "./components/ErrorComponent";
import SignOut from "./components/signout/SignOut";
import SocialSignInBroker from "./components/signin/SocialSignInBroker";

class App extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
    };
    this.handleFirstName = this.handleFirstName.bind(this);
  }

  handleFirstName(value) {
    this.setState({firstName: value})
  }

  render() {
    return (
        <Router>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/category" component={Category}/>
            <Route path="/order" component={Orders}/>
            <Route path="/product" component={Products}/>
            <Route path="/user" component={Users}/>
            <Route path="/signin" component={SignIn}/>
            <Route path="/signup" component={SignUp}/>
            <Route path="/signout" component={SignOut}/>
            <Route path="/socialsignin" component={SocialSignInBroker}/>
            <Route path="/addcategory" component={AddCategory}/>
            <Route path="/addproduct" component={AddProduct}/>
            <Route path="/addorder/:id/:priceNet/:priceGross" component={AddOrder}/>
            <Route component={ErrorComponent} />
          </Switch>
        </Router>
    );
  }
}

export default App;
