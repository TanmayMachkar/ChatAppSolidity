//0x5FbDB2315678afecb367f032d93F642f64180aa3

//ChatAppABI: This is the Application Binary Interface (ABI) of the smart contract. The ABI is a JSON representation of the smart contract's interface, including its functions and parameters. It tells ethers.js how to interact with the smart contract.
//ChatAppAddress: This is the address of the deployed instance of the smart contract on the Ethereum blockchain. When you deploy a smart contract, it gets assigned a unique Ethereum address where it resides on the blockchain.
import chatAppJSON from './ChatApp.json';

export const ChatAppAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const ChatAppABI = chatAppJSON.abi;