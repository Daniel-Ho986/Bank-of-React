import React, { Component } from "react";
import {Link} from 'react-router-dom';

import AccountBalance from './AccountBalance';
import DisplayInfo from './DisplayInfo';

class Credit extends Component{
    constructor(props){
        super(props);

        this.state = {
            creditAmount: 0,
            creditDescription: '',
        }
    }

    setAmount = (event) => {
        this.setState({creditAmount: event.target.value})
    }

    setDescription = (event) => {
        this.setState({creditDescription: event.target.value})
    }

    Submit = (event) => {
        event.preventDefault();
        let today = new Date();
        let newCredit = {
            amount: this.state.creditAmount,
            description: this.state.creditDescription,
            date: today,
        };
        this.props.updateCredit(newCredit);
    }

    render(){
        return(
            <div>
                <h1> Credit Page</h1>
                <Link to="/">Home</Link><br></br>
                <Link to="/userProfile">User Profile</Link><br></br>
                <Link to="/login">Log In</Link><br></br>
                <Link to="/debit">Debit</Link><br></br>
                <AccountBalance accountBalance={this.props.accountBalance}/>    
                <div>
                    <label>Amount: </label>
                    <input
                        type="text"
                        name="amount"
                        onChange={(e) => {
                            this.setAmount(e);
                        }}
                        value={this.creditAmount}
                        placeholder="$12345.00"
                    />
                    <label>Description: </label>
                    <input
                        type="text"
                        name="description"
                        onChange={(e) => {
                            this.setDescription(e);
                        }}
                        value={this.creditDescription}
                        placeholder="Tuition"
                    /> 
                    <button className="button" onClick={this.Submit}>Submit</button>
                </div>
                <div>
                {this.props.credit.map((item, index) =>{
                    <DisplayInfo
                        key= {index}
                        description = {item.description}
                        amount = {item.amount}
                        today = {new Date(item.date)} 
                    />
                })}
                </div>
            </div>
        );
    }
}
export default Credit;