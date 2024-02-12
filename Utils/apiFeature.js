import {ethers} from 'ethers';
import Web3Modal from 'web3modal';

import { ChatAppAddress, ChatAppABI } from '../Context/constants';

export const CheckIfWalletConnected = async() => {
	try{
		if(!window.ethereum) return console.log("Install Metamask");
		const accounts = await window.ethereum.requests({
			method: "eth_accounts"
		});

		const firstAccount = accounts[0];
		return firstAccount;
	} catch(error){
		console.log(error);
	}
}

//connect with the wallet in case of click event
export const connectWallet = async() => {
	try{
		if(!window.ethereum) return console.log("Install Metamask");
		const accounts = await window.ethereum.requests({
			method: "eth_requestAccounts" //The method parameter is set to "eth_accounts", which is a method used to retrieve the accounts associated with the connected wallet.
		});

		const firstAccount = accounts[0];
		return firstAccount;
	} catch(error){
		console.log(error);
	}
}

const fetchContract = (signerOrProvider) => 
	new ethers.Contract(ChatAppABI, ChatAppAddress, signerOrProvider); //The ethers.Contract class is a core part of the ethers.js library and is used to interact with Ethereum smart contracts.
	//signerOrProvider: The one who is trying to interact with our smart contract

export const connectingWithContract = async() => {
	try {
		const web3modal = new Web3Modal();
		const connection = await web3modal.connect(); //This line uses the connect method of the Web3Modal instance to initiate a connection to a user's Ethereum wallet. It awaits the result of this connection operation.
		const provider = new ethers.providers.Web3Provider(connection); //Once the connection to the wallet is established, this line creates a new instance of ethers.providers.Web3Provider. This provider interacts with the Ethereum blockchain through the connected wallet.
		const signer = provider.getSigner(); //This line obtains a signer object from the provider. The signer is used to sign transactions and messages. It allows the application to interact with the blockchain on behalf of the connected wallet.
		const contract = fetchContract(signer);

		return contract;
	} catch(error) {
		console.log(error);
	}
}

//when user sends message time will be returned in the form of timestamp therefore we need to convert it into readable time
export const convertTime = (time) => {
	const newTime = new Date(time.toNumber());

	const realTime = 
		newTime.getHours() + 
		"/" +
		newTime.getMinutes() +
		"/" + 
		newTime.getSeconds() +
		" Date:" +
		newTime.getDate() +
		"/" +
		(newTime.getMonth() + 1) +//index based values returned. eg: jan = 0, feb = 1. therefore, we added 1
		"/" +
		newTime.getFullYear();

	return realTime;
}