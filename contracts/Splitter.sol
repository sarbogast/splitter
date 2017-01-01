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
		var value = msg.value;
		var half = value / 2;
		if(!accountA.send(half)) {
			throw;
		}
		if(!accountB.send(value - half)) {
			throw;
		}
	}

	function sendAmount() payable returns (bool success) {
		var value = msg.value;
		var half = value / 2;
		if(!accountA.send(half) || !accountB.send(value-half)) {
			return false;
		}
		Transfer(msg.sender, accountA, half);
		Transfer(msg.sender, accountB, value - half);
		return true;
	}

	function getAccountA() returns (address addr) {
		return accountA;
	}

	function getAccountB() returns (address addr) {
		return accountB;
	}
}