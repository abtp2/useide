"use client";
import {useRef, useState} from "react";
import styles from "./layout.module.css";
import { LuMenu, LuEllipsisVertical, LuPlay} from "react-icons/lu";
import { useGlobalState } from "@/app/GlobalState";

export default function Navbar(){
  const { sidebar, setSidebar } = useGlobalState();
  
  return(
    <div className={styles.navbar}>
      <LuMenu onClick={()=>{setSidebar(!sidebar)}}/>
      <div className={styles.navbarFileName}>
        <h1>untitled.js</h1>
        <p>../admin/src/layout/untitled.js</p>
      </div>
      <LuPlay/>
      <LuEllipsisVertical/>
    </div>
  );
}
