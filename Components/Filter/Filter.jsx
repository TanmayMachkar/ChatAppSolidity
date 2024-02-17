import React, { useState, useContext } from "react";
import Image from 'next/image';

import styles from './Filter.module.css';
import images from '../../assets';
import { ChatAppContext } from '../../Context/ChatAppContext';
import { Model } from '../index';

const Filter = () => {

  const {account, addFriends} = useContext(ChatAppContext);
  const [addFriend, setAddFriend] = useState(false);
  return(
    <div className = {styles.Filter}>
      <div className = {styles.Filter_box}>
        <div className = {styles.Filter_box_left}>
          <div className = {styles.Filter_box_left_search}>
            <Image src = {images.search} alt = 'image' width = {20} height = {20}/>
            <input type = 'text' placeholder = 'search..' />
          </div>
        </div>
        <div className = {styles.Filter_box_right}>
          <button>
            <Image 
              src = {images.clear}
              alt = 'clear'
              width = {20}
              height = {20}
            />
            CLEAR CHAT
          </button>
          <button onClick = {() => setAddFriend(true)}>
            <Image 
              src = {images.user}
              alt = 'clear'
              width = {20}
              height = {20}
            />
            ADD FRIEND
          </button>
        </div>
      </div>
      {/*Model Component*/}
      {addFriend && (
        <div className = {styles.Filter_model}>
          <Model 
            openBox = {setAddFriend}
            title = 'WELCOME TO'
            head = 'CHAT BUDDY'
            info = 'sfsfds'
            smallInfo = "Kindly Select Your Friend's Name & Address.."
            image = {images.hero}
            functionName = {addFriend}
          />
        </div>
      )}
    </div>
  );
};

export default Filter;
