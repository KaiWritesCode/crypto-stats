import React, { useState } from 'react'
import './styles/App.css';
import MainDisplay from './components/main/MainDisplay';
import InfoNav from './components/nav/InfoNav';
import Footer from './components/main/Footer'
import MainNav from './components/nav/MainNav';

import { Switch, Route, HashRouter as Router } from "react-router-dom";
import CryptoInfo from "./components/coin-id/CryptoInfo";
import CategoryList from "./components/categories/CategoryList";


function App() {

  const [inputValue, setInputValue] = useState("")

  return (



    <>
      <Router>
        <Switch>

          <Route exact path="/" >
            <div>
              <MainNav inputValue={inputValue} setInputValue={setInputValue} />
              <InfoNav />
              <MainDisplay inputValue={inputValue} />
              <Footer />
            </div>
          </Route>


          <Route path="/assets/:id">
            <CryptoInfo />
          </Route>

          <Route path="/categories">
            <CategoryList />
          </Route>

        </Switch>
      </Router>
    </>
  );
}

export default App;
