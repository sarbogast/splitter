var accounts;
var account;

function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};

function refreshBalances() {
  var splitter = Splitter.deployed();

  var contract_address_element = document.getElementById("contractAddress");
  contract_address_element.innerHTML = splitter.address;

  var contract_balance_element = document.getElementById("balance");
  contract_balance_element.innerHTML = web3.eth.getBalance(splitter.address);

  splitter.getAccountA.call().then(function(result) {
    console.log("Account A: " + result);
    var accountA_balance_element = document.getElementById("balanceA");
    accountA_balance_element.innerHTML = web3.eth.getBalance(result);
  }).catch(function(e){
    console.error(e);
  });
  
  splitter.getAccountB.call().then(function(result) {
    console.log("Account B: " + result);
    var accountB_balance_element = document.getElementById("balanceB");
    accountB_balance_element.innerHTML = web3.eth.getBalance(result);
  }).catch(function(e){
    console.error(e);
  })
};

function sendAmount() {
  var splitter = Splitter.deployed();

  var amount = web3.toWei(parseInt(document.getElementById("amount").value), 'ether');

  setStatus("Initiating transaction... (please wait)");

  web3.eth.sendTransaction({from: account, to: splitter.address, value: amount, gas: 50000}, function(error, result){
    if(!error) {
      console.log(result);
      
      web3.eth.getTransactionReceiptMined(result).then(function(receipt){
        console.log(receipt);
        setStatus("Transaction complete!");
        refreshBalances();
      }).catch(function(e) {
        console.error(e);
        setStatus("Error sending coin; see log.");
      });      
    } else {
      console.error(e);
      setStatus("Error sending coin; see log.");
    } 
  });

};

window.onload = function() {
  web3.eth.getAccounts(function(err, accs) {

    web3.eth.getTransactionReceiptMined = function (txnHash, interval) {
        var transactionReceiptAsync;
        interval |= 500;
        transactionReceiptAsync = function(txnHash, resolve, reject) {
            try {
                var receipt = web3.eth.getTransactionReceipt(txnHash);
                if (receipt == null) {
                    setTimeout(function () {
                        transactionReceiptAsync(txnHash, resolve, reject);
                    }, interval);
                } else {
                    resolve(receipt);
                }
            } catch(e) {
                reject(e);
            }
        };

        return new Promise(function (resolve, reject) {
            transactionReceiptAsync(txnHash, resolve, reject);
        });
    };

    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
    account = accounts[0];

    refreshBalances();
  });
}
