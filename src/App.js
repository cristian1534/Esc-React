import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";

//components
import HomePage from './pages/home/home';
import ShopPage from "./pages/shop/shop";
import SignPage from "./pages/signPage.jsx/sign";
import Header from "./components/header/header";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unSubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          });
          console.log(this.state);
        });
      }

      this.setState({ currentUser: userAuth });
    });
  }

  render() {
    return (
      <div>
        <Header />
          <Switch>
           <Route exact path='/' component={HomePage}/>
            <Route path="/shop" component={ShopPage} />
            <Route path="/sign" component={SignPage} />
          </Switch>
      
      </div>
    );
  }
}

export default App;
