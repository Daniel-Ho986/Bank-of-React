import React, { Component } from "react";
import {Link} from 'react-router-dom';

import AccountBalance from './AccountBalance';
import DisplayInfo from './DisplayInfo';



class Debit extends Component{
    constructor(props){
        super(props);

        this.state = {
            debitAmount: 0,
            debitDescription: '',
        }
    }

    setAmount = (event) => {
        this.setState({debitAmount: event.target.value})
    }

    setDescription = (event) => {
        this.setState({debitDescription: event.target.value})
    }

    Submit = (event) => {
        event.preventDefault();
        let today = new Date();
        let newDebit = {
            amount: this.state.debitAmount,
            description: this.state.debitDescription,
            date: today,
        };
        this.props.updateDebit(newDebit);
    }

    render(){
        return(
            <div>
                <h1> Debit Page</h1>
                <Link to="/">Home</Link><br></br>
                <Link to="/userProfile">User Profile</Link><br></br>
                <Link to="/login">Log In</Link><br></br>
                <Link to="/credit">Credit</Link><br></br>
                <AccountBalance accountBalance={this.props.accountBalance}/>    
                <div>
                    <label>Amount: </label>
                    <input
                        type="text"
                        name="amount"
                        onChange={(e) => {
                            this.setAmount(e);
                        }}
                        value={this.debitAmount}
                        placeholder="$12345.00"
                    />
                    <label>Description: </label>
                    <input
                        type="text"
                        name="description"
                        onChange={(e) => {
                            this.setDescription(e);
                        }}
                        value={this.debitDescription}
                        placeholder="Tuition"
                    /> 
                    <button className="button" onClick={this.Submit}>Submit</button>
                </div>
                <div>
                {this.props.debit.map((item, index) =>{
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
export default Debit;



