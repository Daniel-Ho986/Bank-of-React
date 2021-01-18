import React, {Component} from 'react';

class DisplayInfo extends Component{
    render(){
        return(
            <div className="displayInfo">
                Description: {this.props.description}
                Amount: {this.props.amount}
                Date: {this.props.today}
            </div>
        )
    }
}
export default DisplayInfo;