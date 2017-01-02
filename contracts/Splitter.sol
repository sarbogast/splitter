pragma solidity ^0.4.2;

contract Splitter {
	address accountA;
	address accountB;

	event Transfer(address indexed _from, address indexed _to, uint256 _value);

	function Splitter(address a, address b) {
		accountA = a;
		accountB = b;
	}

	function () payable {
		uint256 value = msg.value;
		uint256 half = value / 2;
		if(!accountA.send(half)) throw;
		if(!accountB.send(value - half)) throw;
	}

	function getAccountA() returns (address addr) {
		return accountA;
	}

	function getAccountB() returns (address addr) {
		return accountB;
	}
}