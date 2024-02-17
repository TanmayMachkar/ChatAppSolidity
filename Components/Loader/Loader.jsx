import React from "react";
import Image from 'next/image';

import styles from './Loader.module.css';
import images from '../../assets';

const Loader = () => {
  return(
    <div className = {styles.Loader}>
      <div className = {styles.Loader_box}>
        <Image src = {images.loader} alt = 'loader' width = {100} height = {100}/>
      </div>
    </div>
  );
};

export default Loader;
