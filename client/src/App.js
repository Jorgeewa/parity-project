import React, { Component } from 'react';
import './App.css';
import Client from "./Client";
import Tabs from "./Tabs";

class App extends Component {
    constructor(props) {
        super(props);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.checkAddress = this.checkAddress.bind(this);
        this.state = {
            address:'',
            addressDetails: {
                accountBalance: null,
                transactionCount: null,
                type : null,
                transactionSent : [],
                transactionReceived : []
            },
            error : ''
        };
    }
  render() {
        return (
            <div className="app" >
            <form >
                <div className="navbar-form mgt-form" role="search">
                <div className="input-group add-on mgt-form">
                <input className="form-control" onChange={this.handleAddressChange} placeholder="Enter Address" required />
                  <div className="input-group-btn">
                    <button className="btn btn-default" onClick={this.checkAddress}type="button">
                    <i className="glyphicon glyphicon-search"></i>
                    </button>

                  </div>
                </div>
                    <div className="error">
                        {this.state.error}
                    </div>
                </div>
            </form>

            <Tabs addressDetails={this.state.addressDetails}/>
            </div>
        )
    }
    
    handleAddressChange(e){
        console.log(e.target.value)
        this.setState({address:e.target.value})
    }

    
    checkAddress(){
        Client.search(this.state.address, addressDetails => {
            if(addressDetails.error){
                console.log(addressDetails.error);
                this.setState({
                  error : addressDetails.error
                });
                return;
            }
            var newAddressDetails = {
                accountBalance: addressDetails.accountBalance,
                transactionCount: addressDetails.transactionCount,
                type : addressDetails.type,
                transactionSent : addressDetails.transactionDetails.filter(function(transaction){
                    return transaction.direction === 'from'
                }),
                transactionReceived : addressDetails.transactionDetails.filter(function(transaction){
                    return transaction.direction === 'to'
                })
            }
            this.setState({
                addressDetails : newAddressDetails,
                error: ""
            });
            
        });
    }
}

export default App;
