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
			const userName = await contract.getUserName(connectAccount);
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

	return(
		<ChatAppContext.Provider value = {{}}>
			{children}
		</ChatAppContext.Provider>
	);
}