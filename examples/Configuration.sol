// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Configuration Contract
 * @dev Shows how plugin handles different comment lengths and patterns
 */
contract Configuration {
    // System parameters - these will be aligned together
    uint256 public constant MAX_SUPPLY = 1000000; // Maximum token supply
    uint256 public constant MIN_STAKE = 100; // Minimum stake amount
    uint256 public constant LOCK_PERIOD = 30 days; // Lock period duration
    uint256 public constant REWARD_RATE = 5; // Annual reward rate (%)
    
    // Time parameters - another aligned group
    uint256 public startTime; // Contract start time
    uint256 public endTime; // Contract end time
    uint256 public lastUpdate; // Last update timestamp
    
    // Fee structure - aligned group with varying lengths
    uint256 public depositFee; // Fee for deposits (basis points)
    uint256 public withdrawalFee; // Fee for withdrawals (basis points)
    uint256 public performanceFee; // Performance fee (basis points)
    uint256 public managementFee; // Management fee (basis points)
    
    // Access control - aligned group
    address public admin; // Administrator address
    address public treasury; // Treasury address for fees
    address public oracle; // Price oracle address
    
    // Feature flags - boolean group
    bool public depositsEnabled; // Whether deposits are allowed
    bool public withdrawalsEnabled; // Whether withdrawals are allowed
    bool public stakingEnabled; // Whether staking is enabled
    bool public emergencyMode; // Emergency shutdown mode
}

