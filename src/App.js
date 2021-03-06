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
import Settings from "./components/setting/Settings";
import EditCategory from "./components/category/EditCategory";
import DeleteCategory from "./components/category/DeleteCategory";
import EditProduct from "./components/product/EditProduct";
import DeleteProduct from "./components/product/DeleteProduct";

class App extends Component {
  constructor(props) {
    super(props);
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
            <Route path="/editcategory" component={EditCategory}/>
            <Route path="/deletecategory" component={DeleteCategory}/>
            <Route path="/addproduct" component={AddProduct}/>
            <Route path="/editproduct" component={EditProduct}/>
            <Route path="/deleteproduct" component={DeleteProduct}/>
            <Route path="/addorder" component={AddOrder}/>
            <Route path="/setting" component={Settings}/>
            <Route component={ErrorComponent} />
          </Switch>
        </Router>
    );
  }
}

export default App;
