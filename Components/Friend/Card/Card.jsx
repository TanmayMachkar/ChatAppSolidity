import React, { useEffect } from "react";
import Image from 'next/image';
import Link from 'next/link';

import styles from './Card.module.css';
import images from '../../../assets';

const Card = ({ readMessage, el, i, readUser }) => {
  return(
    // In Next.js, the query object is used to pass query parameters in the URL. Query parameters are key-value pairs 
    //that appear after the ? in a URL and are separated by & if there are multiple parameters. For example, in the URL 
    //https://example.com/page?name=John&age=30, name and age are query parameters.
    <Link 
      href = {{pathname: '/', query: { name: el.name, address: el.pubkey }}}
    >
      <div className = {styles.Card} onClick = {() => (readMessage(el.pubkey), readUser(el.pubkey))}>
        <div className = {styles.Card_box}>
          <div className = {styles.Card_box_left}>
            <Image 
              src = {images.accountName}
              alt = 'username'
              width = {50}
              height = {50}
              className = {styles.Card_box_left_img}
            />
          </div>
          <div className = {styles.Card_box_right}>
            <div className = {styles.Card_box_right_middle}>
              <h4>{el.name}</h4>
              <small>{el.pubkey.slice(21)}..</small>
            </div>
            <div className = {styles.Card_box_right_end}>
              <small>{i+1}</small>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
