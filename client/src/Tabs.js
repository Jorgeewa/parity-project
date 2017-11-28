import React from "react";
import Tab from "react-simpletabs";

class Tabs extends React.Component{
    
  render() {
      const sentTransactions = this.props.addressDetails.transactionSent.map((transaction, index) =>(
            <tr key={index}>
              <td>{transaction.addressTo}</td>
              <td>{transaction.gasPrice}</td>
              <td>{transaction.value}</td>
              <td>{transaction.time}</td>
            </tr>
      ));
      
      const receivedTransactions = this.props.addressDetails.transactionReceived.map((transaction, index) =>(
            <tr key={index}>
              <td>{transaction.addressFrom}</td>
              <td>{transaction.gasPrice}</td>
              <td>{transaction.value}</td>
              <td>{transaction.time}</td>
            </tr>
      ));
    return (
      <Tab>
        <Tab.Panel title='Address details'>
            <div className="row">
            <div className="col-md-6">
                <div className="panel panel-default">
                    <div className="panel-body panel-view"><br/>
            <table className="table">
        <tbody>
               <tr>
                    <th>Account Balance :</th>
                    <td>{this.props.addressDetails.accountBalance}</td>
               </tr>
                <tr>
                    <th>Transaction Count :</th>
                    <td>{this.props.addressDetails.transactionCount}</td>
               </tr>
                <tr>
                    <th>Type :</th>
                    <td>{this.props.addressDetails.type}</td>
               </tr>
        </tbody>
            </table>
        </div>
        </div>
         </div>
        </div>
        </Tab.Panel>
        <Tab.Panel title='Transations sent'>
          <table className="ui selectable structured large table table-bordered table-striped">
            <thead>
            <tr>
                <th>Recievers Address</th>
                <th>Gas price</th>
                <th>Value</th>
                <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {sentTransactions}
          </tbody>
          </table>
        </Tab.Panel>
        <Tab.Panel title='Transactions received'>
          <table className="ui selectable structured large table table-bordered table-striped">
            <thead>
                <tr>
                    <th>Block hash</th>
                    <th>Sender Address</th>
                    <th>Gas price</th>
                    <th>Value</th>
                    <th>Time</th>
              </tr>
            </thead>
          <tbody>
            {receivedTransactions}
          </tbody>
          </table>
        </Tab.Panel>
      </Tab>
    );
  }
};
 
export default Tabs;