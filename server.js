const express = require("express");
const fs = require("fs");
const bodyParser = require('body-parser');
const parityApi = require('@parity/api');
const bluebirdPromise = require('bluebird');


const provider = new parityApi.Provider.Http('https://kovan.infura.io/');
const api = new parityApi(provider);
const app = express();

app.set("port", process.env.PORT || 3001);

app.use(bodyParser.json());

app.get("/api/search", (req, res) => {
    const address = req.query.address;
    const invalid = 'INVALID_PARAMS';
    var transactionDetails = [];
    
    var promiseFor = bluebirdPromise.method(function(condition, action, value) {
        if (!condition(value)) return value;
        return action(value).then(promiseFor.bind(null, condition, action));
    });
    //test address 0x00360d2b7d240ec0643b6d819ba81a09e40e5bcd
    //trick used instead of isAddress
    api.eth.getTransactionCount(address).then((success)=>{
        Promise.all([
            api.eth.getTransactionCount(address),
            api.eth.getBalance(address),
            api.eth.getCode(address),
            api.eth.blockNumber().then(function(res){
                endBlockNumber = res.toString();
                //endBlockNumber = 4892022;
                startBlockNumber = endBlockNumber - 100;
                console.log("Searching for transactions to/from account \"" + address + "\" within blocks "  + startBlockNumber + " and " + endBlockNumber);
                    return promiseFor(function(){
                        console.log(startBlockNumber)
                        return startBlockNumber < endBlockNumber;
                    }, function(start){
                    return api.eth.getBlockByNumber(start, true).then((block) => {
                        console.log(startBlockNumber);
                        if (block != null && block.transactions[0] != null) {
                            console.log(block.transactions[0] == null, "I ran blcok trans")
                            bluebirdPromise.map(block.transactions, function(e) {
                                console.log(e.from, "I ran inside map");
                                if (address == "*" || address == e.from || address == e.to) {
                                    console.log("found a txn")
                                    blockDetails = {
                                        'direction' : address == e.from ? 'from' : 'to',
                                        'blockHash' : e.blockHash,
                                        'value': e.value,
                                        'addressFrom': e.from,
                                        'addressTo' : e.to,
                                        'gasPrice' : e.gasPrice,
                                        'time' : new Date(block.timestamp).toGMTString()
                                    }
                                    transactionDetails.push(blockDetails);
                                }
                            }).then(function(){
                            return startBlockNumber++;
                            });
                        } else{
                            return startBlockNumber++;
                        }       
                    });

                }, startBlockNumber)
        })
    ]).then(([transactionCount, accountBalance, type]) =>{
        res.json({
            transactionCount: transactionCount.toString(10),
            accountBalance: accountBalance.toString(10),
            type: type.toString(10),
            transactionDetails: transactionDetails
        });
    })
    }).catch((err)=>{
        if(err.type == invalid){
            res.json({
                error: "Missing required parameter (address) or address is invalid"
            });
            Promise.reject('wrong parameter');
            return;
        }
    });
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
