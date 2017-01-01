pragma solidity ^0.4.2;

contract Splitter {
	address accountA;
	address accountB;

	function Splitter(address a, address b) {
		accountA = a;
		accountB = b;
	}

	function () payable {
		var value = msg.value;
		var half = value / 2;
		if(!accountA.send(half)) {
			throw;
		}
		if(!accountB.send(value - half)) {
			throw;
		}
	}
}