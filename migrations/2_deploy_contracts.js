module.exports = function(deployer) {
  web3.eth.getAccounts(function (err, accounts) { 
  	deployer.deploy(Splitter, accounts[1], accounts[2]); 
  });
};
