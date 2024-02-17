import React from "react";
import Image from 'next/image';

import styles from './UserCard.module.css';
import images from '../../assets';

const UserCard = ({ el, i, addFriends }) => {
  return(
    <div className = {styles.UserCard}>
      <div className = {styles.UserCard_box}>
        <Image
          className = {styles.UserCard_box_img}
          src = {images[`image${i+1}`]}
          alt = 'user'
          width = {100}
          height = {100} 
        />
        <div className = {styles.UserCard_box_info}>
          <h3>{el.name}</h3>
          <p>{el.accountAddress.slice(0,25)}..</p>
          <button 
            onClick = {() =>
              addFriends({name: el.name, accountAddress: el.accountAddress})
            }
          >
            Add Friend
          </button>
        </div>
      </div>
      <small className = {styles.number}>{i+1}</small>
    </div>
  );
};

export default UserCard;
