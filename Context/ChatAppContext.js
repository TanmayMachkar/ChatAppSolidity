//creating function to interact with our smart contract like creating acc, fetching acc etc
import React, { useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import { 
	CheckIfWalletConnected,
	connectWallet,
	connectingWithContract,
	convertTime
} from "../Utils/apiFeature";

export const ChatAppContext = React.createContext();

export const ChatAppProvider = ({ children }) => {
	//This ChatAppProvider component, along with the context it provides, can now be used to share the title value with any descendant components that consume the ChatAppContext.
	//So, the outer curly braces {} are used to denote the JSX expression, and the inner curly braces {{}} are used to create an object literal with the title as a property. This ensures that the value prop of the Provider component receives an object, as expected.
	
	const [account, setAccount] = useState("");
	const [userName, setUserName] = useState("");
	const [friendLists, setFriendLists] = useState([]);
	const [friendMsg, setFriendMsg] = useState([]);
	const [loading, setLoading] = useState(false);
	const [userLists, setUserLists] = useState([]);
	const [error, setError] = useState("");

	//Chat user data: 2 state variables to display who i'm currently chatting with
	const [currentUserName, setCurrentUserName] = useState("");
	const [currentUserAddress, setCurrentUserAddress] = useState("");

	//when someone creates an account we will redirect to a homepage
	const router = useRouter();

	//fetch data time of page load
	//async since we're dealing with smart contract variable
	const fetchData = async() => {
		try{
			//get contract
			const contract = await connectingWithContract();
			//get account
			const connectAccount = await connectWallet();
			setAccount(connectAccount);
			//GET USERNAME
			const userName = await contract.getUsername(connectAccount);
			setUserName(userName);
			//Get My friend list
			const friendLists = await contract.getMyFriend();
			setFriendLists(friendLists);
			//Get all app user list
			const userList = await contract.getAllAppUser();
			setUserLists(userList);
		} catch(error) {
			setError("Please Install and Connect Your Wallet");
		}
	}
	useEffect(() => {
		fetchData();
	}, []); //function will run once after the initial render

	//Read message
	const readMessage = async(friendAddress) => {
		try{
			const contract = await connectingWithContract();
			const read = await contract.readMessage(friendAddress);
			setFriendMsg(read);
		} catch(error) {
			setError("Currently You Have No Message");
		}
	}

	//create account
	const createAccount = async({ name, accountAddress }) => {
		try{
			if(name || accountAddress) 
				return setError("Name and AccountAddress, cannot be empty");
			const contract = await connectingWithContract();
			const getCreatedUser = await contract.createAccount(name);
			setLoading(true);
			await getCreatedUser.wait();
			setLoading(false);
			window.location.reload(); //reload the current page
		} catch(error) {
			setError("Error while creating your account Please reload your browser")
		}
	}

	//Add your friends
	const addFriends = async({ name, accountAddress }) => {
		try{
			if(name || accountAddress) 
				return setError("Name and AccountAddress, cannot be empty");

			const contract = await connectingWithContract();
			const addMyFriend = await contract.addFriend(accountAddress, name);
			setLoading(true);
			await addMyFriend.wait();
			setLoading(false);
			router.push("/"); //render home(root) page
			window.location.reload();
		} catch(error){
			setError("Something went wrong while adding your friends, try again");
		}
	}

	//send message
	const sendMessage = async({ msg, address }) => {
		try{
			if(msg || address)
					return setError("Please type your message");
			const contract = await connectingWithContract();
			const addMessage = await contract.sendMessage(address, msg);
			setLoading(true);
			await addMessage.wait();
			setLoading(false);
			window.location.reload();
		} catch(error){
			setError("Please reload and try again");
		}
	}

	//read info
	//creating this function to get info of person we're chatting with
	const readUser = async(userAddress) => {
		const contract = await connectingWithContract();
		const userName = await contract.getUsername(userAddress);
		setCurrentUserName(userName);
		setCurrentUserAddress(userAddress);
	}

	return(
		<ChatAppContext.Provider value = {{
			readMessage, 
			createAccount, 
			addFriends, 
			sendMessage, 
			readUser,
			connectWallet,
			CheckIfWalletConnected,
			account,
			userName,
			friendLists,
			friendMsg,
			loading,
			userLists,
			error,
			currentUserName,
			currentUserAddress
		}}>
			{children}
		</ChatAppContext.Provider>
	);
}