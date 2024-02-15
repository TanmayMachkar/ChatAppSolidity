import React, { useEffect, useState, useContext } from "react";
import Image from 'next/image';
import Link from 'next/link';

//internal import
import './NavBar.module.css';
import { ChatAppContext } from '../../Context/ChatAppContext';
import { Model, Error } from '../index';
import images from '../../assets';

const NavBar = () => {
  const menuItems = [
    {
      menu: "All Users",
      link: "alluser"
    },
    {
      menu: "CHAT",
      link: "/"
    },
    {
      menu: "CONTACT",
      link: "/"
    },
    {
      menu: "SETTING",
      link: "/"
    },
    {
      menu: "FAQS",
      link: "/" 
    },
    {
      menu: "Terms Of Use",
      link: "/"
    }
  ]

  //USESTATE
  const [active, setActive] = useState(2);
  const [open, setOpen] = useState(false);
  const [openModel, setOpenModel] = useState(false);

  const {account, userName, connectWallet} = useContext(ChatAppContext);
  return(
    <div className="NavBar">
      <div className="NavBar_box">
        <div className="NavBar_box_left">
          <Image src={images.logo} alt="logo" width={50} height={50} />
        </div>
        <div className="NavBar_box_right">
        {/*//Desktop*/}
          <div className="NavBar_box_right_menu">
            {menuItems.map((el, i) => ( 
              <div 
                onClick={() => setActive(i+1)} 
                key={i+1}
                className={`NavBar_box_right_menu_items ${active == i+1 ? 'active_btn' : ''}`}
              >
                <Link 
                  className="NavBar_box_right_menu_items_link"
                  href={el.link}
                >
                  {el.menu}
                </Link>
              </div>
            ))}
          </div>
          {/*//Mobile*/}
          {open && (
            <div className="mobile_menu">
            {menuItems.map((el, i) => ( 
              <div 
                onClick={() => setActive(i+1)} 
                key={i+1}
                className={`mobile_menu_items ${active == i+1 ? 'active_btn' : ''}`}
              >
                <Link 
                  className="mobile_menu_items_link"
                  href={el.link}
                >
                  {el.menu}
                </Link>
              </div>
            ))}
              <p className = 'mobile_menu_btn'>
                <Image 
                  src = {images.close} 
                  alt = 'close' 
                  width = {50} 
                  height = {50} 
                  onClick = {() => setOpen(false)}
                />
              </p>  
            </div>
          )}
          {/*//Connect wallet*/}
          <div className = 'NavBar_box_right_connect'>
            {account == "" ? (
              <button onClick = {() => connectWallet()}>
                {""}
                <span>Connect Wallet</span>
              </button> 
            ) : (
                <button onClick = {() => setOpenModel(true)}>
                  {""}
                  <Image 
                    src = {userName ? images.accountName : images.create2}
                    alt = "Account image"
                    width = {20}
                    height = {20}
                  />
                  {""}
                  <small>{userName || "Create account"}</small>
                </button>
            )}
          </div>

          <div 
            className = "NavBar_box_right_open"
            onClick = {() => setOpen(true)}
          >
            <Image src = {images.open} alt = "open" width = {30} height = {30}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
