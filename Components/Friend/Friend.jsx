import React, { useState, useContext } from "react";
import Image from 'next/image';

import styles from './Friend.module.css';
import images from '../../assets';
import Card from './Card/Card';
import Chat from './Chat/Chat';

import { ChatAppContext } from '../../Context/ChatAppContext';

const Friend = () => {

  const { 
    sendMessage, 
    account, 
    friendLists, 
    readMessage, 
    userName, 
    friendMsg,
    loading, 
    readUser,
    currentUserName,
    currentUserAddress 
  } = useContext(ChatAppContext);
  return(
    <div className = {styles.Friend}>
      <div className = {styles.Friend_box}>
        <div className = {styles.Friend_box_left}>
          {friendLists.map((el,i) => (
            <Card 
              key = {i+1}
              el = {el}
              i = {i}
              readMessage = {readMessage}
              readUser = {readUser} 
            />
          ))}
        </div>
        <div className = {styles.Friend_box_right}>
          <Chat 
            functionName = {sendMessage}
            readMessage = {readMessage}
            friendMsg = {friendMsg} 
            account = {account}
            userName = {userName}
            loading = {loading}
            currentUserName = {currentUserName}
            currentUserAddress = {currentUserAddress}
            readUser = {readUser}
          />
        </div>
      </div>
    </div>
  );
};

export default Friend;
