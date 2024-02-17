import React, { useState, useContext } from "react";
import Image from 'next/image';
import Link from 'next/link';
import styles from './NavBar.module.css';
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

  const [active, setActive] = useState(2);
  const [open, setOpen] = useState(false);
  const [openModel, setOpenModel] = useState(false);

  const { account, userName, connectWallet, createAccount, error } = useContext(ChatAppContext);

  return (
    <div className={styles.NavBar}>
      <div className={styles.NavBar_box}>
        <div className={styles.NavBar_box_left}>
          <Image src={images.logo} alt="logo" width={50} height={50} />
        </div>
        <div className={styles.NavBar_box_right}>
          {/* Desktop */}
          <div className={styles.NavBar_box_right_menu}>
            {menuItems.map((el, i) => (
              <div
                onClick={() => setActive(i + 1)}
                key={i + 1}
                className={`${styles.NavBar_box_right_menu_items} ${active === i + 1 ? styles.active_btn : ''}`}
              >
                <Link href={el.link}>
                  <a className={styles.NavBar_box_right_menu_items_link}>{el.menu}</a>
                </Link>
              </div>
            ))}
          </div>
          {/* Mobile */}
          {open && (
            <div className={styles.mobile_menu}>
              {menuItems.map((el, i) => (
                <div
                  onClick={() => setActive(i + 1)}
                  key={i + 1}
                  className={`${styles.mobile_menu_items} ${active === i + 1 ? styles.active_btn : ''}`}
                >
                  <Link href={el.link}>
                    <a className={styles.mobile_menu_items_link}>{el.menu}</a>
                  </Link>
                </div>
              ))}
              <p className={styles.mobile_menu_btn}>
                <Image
                  src={images.close}
                  alt='close'
                  width={50}
                  height={50}
                  onClick={() => setOpen(false)}
                />
              </p>
            </div>
          )}
          {/* Connect wallet */}
          <div className={styles.NavBar_box_right_connect}>
            {account === "" ? (
              <button onClick={() => connectWallet()}>
                <span>Connect Wallet</span>
              </button>
            ) : (
              <button onClick={() => setOpenModel(true)}>
                <Image
                  src={userName ? images.accountName : images.create2}
                  alt='Account image'
                  width={20}
                  height={20}
                />
                <small>{userName || "Create account"}</small>
              </button>
            )}
          </div>

          <div
            className={styles.NavBar_box_right_open}
            onClick={() => setOpen(true)}
          >
            <Image src={images.open} alt='open' width={30} height={30} />
          </div>
        </div>
      </div>

      {/* Model Component */}
      {openModel && (
        <div className = {styles.modelBox}>
          <Model 
            openBox = {setOpenModel}
            title = "Welcome to"
            head = "Chat Buddy"
            info = "jajfdsgfjdsdfj"
            smallInfo = "Kindly select your name...."
            image = {images.hero}
            functionName = {createAccount}
            address = {account}
          />
        </div>
      )}
      {error == "" ? "" : <Error error = {error}/>}
    </div>
  );
};

export default NavBar;
