//0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0

//ChatAppABI: This is the Application Binary Interface (ABI) of the smart contract. The ABI is a JSON representation of the smart contract's interface, including its functions and parameters. It tells ethers.js how to interact with the smart contract.
//ChatAppAddress: This is the address of the deployed instance of the smart contract on the Ethereum blockchain. When you deploy a smart contract, it gets assigned a unique Ethereum address where it resides on the blockchain.
import chatAppJSON from './ChatApp.json';

export const ChatAppAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

export const ChatAppABI = chatAppJSON.abi;