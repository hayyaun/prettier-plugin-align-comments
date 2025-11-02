// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title ERC20 Token Example
 * @dev This example demonstrates how the plugin aligns trailing comments
 */
contract Token {
    // Token metadata
    string public name;         // Token name
    string public symbol;       // Token symbol
    uint8 public decimals;      // Decimal places
    uint256 public totalSupply; // Total supply

    // Balances and allowances
    mapping(address => uint256) public balanceOf;                     // Balance tracking
    mapping(address => mapping(address => uint256)) public allowance; // Allowance tracking

    // Contract state
    address public owner; // Contract owner
    bool public paused;   // Pause state
    uint256 public fee;   // Transaction fee in basis points

    // Events
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event Pause();
    event Unpause();

    constructor(string memory _name, string memory _symbol, uint8 _decimals, uint256 _initialSupply) {
        name = _name;                                            // Set token name
        symbol = _symbol;                                        // Set token symbol
        decimals = _decimals;                                    // Set decimal places
        totalSupply = _initialSupply * 10 ** uint256(_decimals); // Calculate total supply
        balanceOf[msg.sender] = totalSupply;                     // Assign all tokens to creator
        owner = msg.sender;                                      // Set contract owner
        paused = false;                                          // Initialize as unpaused
        fee = 0;                                                 // No fee by default
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(!paused, "Contract is paused");                           // Check if paused
        require(balanceOf[msg.sender] >= _value, "Insufficient balance"); // Check balance
        require(_to != address(0), "Invalid recipient");                  // Validate recipient

        balanceOf[msg.sender] -= _value; // Deduct from sender
        balanceOf[_to] += _value;        // Add to recipient

        emit Transfer(msg.sender, _to, _value);
        return true;
    }
}
