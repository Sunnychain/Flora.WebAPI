import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import WebSite from './Website/index';
import AuctionsDetails from './pages/Auctions/AuctionsDetails';
import Main from './middlewares/Main';
import Home from './pages/Home/Home';
import AboutPage from './pages/About/About';
import Market from './pages/market/Market';
import Auctions from './pages/Auctions/Auctions';
import Profile from './pages/Profile/Profile';

import Details from './pages/Description/Description';
import { SubstrateContextProvider } from './substrate-lib';
export default function App () {
  return (
    <SubstrateContextProvider>
      <Router>
        <Switch>
          <Route path="/" exact>
            <WebSite />
          </Route>
          <Route path="/app" exact>
            <Home />
          </Route>
          <Route path="/create" exact>
            <Main />
          </Route>
          <Route path="/market" exact>
            <Market />
          </Route>
          <Route path="/details/:id" component={Details} />
          <Route path="/auctions/:id" component={AuctionsDetails} />
          <Route path="/about" exact>
            <AboutPage />
          </Route>
          <Route path="/Auctions" exact>
            <Auctions />
          </Route>
          <Route path="/perfil" exact>
            <Profile />
          </Route>
        </Switch>
      </Router>
    </SubstrateContextProvider>
  );
}
