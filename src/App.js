import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';

import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Debit from './components/Debit';
import Credit from './components/Credit';


class App extends Component {
  constructor(){
    super();

    this.state = {
      accountBalance: 14568.27,
      currentUser: {
        userName: 'bob_loblaw',
        memberSince: '08/23/99',
      },
      debit: [],
      credit: [],
    }
  }

  componentDidMount = () =>{
    this.fetchCredit();
    this.fetchDebit();
  }

  mockLogIn = (logInInfo) => {
      const newUser = {...this.state.currentUser}
      newUser.userName = logInInfo.userName
      this.setState({currentUser: newUser})
  }

  fetchDebit = () => {
    fetch(`https://moj-api.herokuapp.com/debits`)
    .then((response) => response.json())
    .then((response) => {
      this.setState({debit: response});
      response.map((item) =>
      this.setState({
        accountBalance: this.state.accountBalance - item.amount}))
    })
    .catch((error) =>
      console.error(error));  
  }

  fetchCredit = () =>{
    fetch(`https://moj-api.herokuapp.com/credits`)
    .then((response) => response.json())
    .then((response) => {
      this.setState({credit: response});
      response.map((item) =>
      this.setState({
        accountBalance: this.state.accountBalance + item.amount}))
    })
    .catch((error) =>
      console.error(error)); 
  }


  updateDebit= (data) => {
    let array = this.state.debit;
    array.push(data);
    this.setState({
      debit: array,
      accountBalance: this.state.accountBalance - data.amount
    });
  }
    
  updateCredit= (data) => {
    let array = this.state.credit;
    array.push(data);
    this.setState({
      credit: array,
      accountBalance: this.state.accountBalance + data.amount
    });
  }
  

  render(){
    const HomeComponent = () => (
      <Home 
        accountBalance={this.state.accountBalance}
      />
    );

    const UserProfileComponent = () => (
      <UserProfile 
        userName={this.state.currentUser.userName}
        memberSince={this.state.currentUser.memberSince}
      />
    )
    
    const LogInComponent = () => (
      <LogIn 
        user={this.state.currentUser} 
        mockLogIn={this.mockLogIn} 
        {...this.props}
      />
    )

    const DebitComponent = () => (
      <Debit
        accountBalance={this.state.accountBalance} 
        debit = {this.state.debit}  
        updateDebit = {this.updateDebit}
        />
    )

    const CreditComponent = () => (
      <Credit
        accountBalance={this.state.accountBalance} 
        credit = {this.state.credit}  
        updateCredit = {this.updateCredit}
        />
    )

    return (
      <Router>
        <Switch>
          <Route exact path ="/" render={HomeComponent}/>
          <Route exact path ="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path ="/debit" render={DebitComponent}/>
          <Route exact path="/credit" render={CreditComponent}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
