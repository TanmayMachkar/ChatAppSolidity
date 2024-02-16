import React, { useState, useContext } from "react";
import Image from 'next/image';

import Style from './Model.module.css';
import images from '../../assets';
import { ChatAppContext } from '../../Context/ChatAppContext';
import { Loader } from '../index';

const Model = ({
  openModel,
  title,
  head,
  info,
  smallInfo,
  image,
  functionName
}) => {

  //UseState
  const [name, setName] = useState("");
  const [accountAddress, setAccountAddress] = useState("");

  const { loading } = useContext(ChatAppContext);
  return(
    <div className = {Style.Model}>
      <div className = {Style.Model_box}>
        <div className = {Style.Model_box_left}>
          <Image src = {image} alt = 'buddy' height = {700} width = {700}/>
        </div>
        <div className = {Style.Model_box_right}>
          <h1>
            {title} <span>{head}</span>
          </h1>
          <p>{info}</p>
          <small>{smallInfo}</small>
          <div className = {Style.Model_box_right_name}>
            <div className = {Style.Model_box_right_name_info}>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Model;
