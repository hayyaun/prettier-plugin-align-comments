// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Storage Contract
 * @dev Demonstrates comment alignment with various data types
 */
contract Storage {
    // Basic types
    uint256 public num;      // Unsigned integer
    int256 public signedNum; // Signed integer
    bool public flag;        // Boolean flag
    address public addr;     // Ethereum address
    bytes32 public data;     // 32-byte data

    // Arrays
    uint256[] public numbers;   // Dynamic array
    address[] public addresses; // Address list

    // Mappings
    mapping(uint256 => string) public names;   // ID to name mapping
    mapping(address => bool) public whitelist; // Whitelist mapping
    mapping(address => uint256) public scores; // User scores

    // Structs with aligned fields
    struct User {
        string name;     // User's name
        uint256 age;     // User's age
        bool active;     // Active status
        uint256 balance; // Account balance
    }

    mapping(address => User) public users;

    // Enums
    enum Status {
        Pending,
        Active,
        Completed,
        Cancelled
    }

    Status public status; // Current status

    constructor() {
        num = 42;                // Initialize number
        flag = true;             // Set flag to true
        addr = msg.sender;       // Set to deployer
        status = Status.Pending; // Initialize status
    }
}
