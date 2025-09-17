"use client";
import {useRef, useState} from "react";
import styles from "./layout.module.css";
import { LuMenu, LuEllipsisVertical, LuPlay} from "react-icons/lu";
import { useGlobalState } from "@/app/GlobalState";
import useOutsideClick from "@/hooks/useOutsideClick";
import FileTree from "@/components/layout/FileTree";

export default function FileManager(){
  const { sidebar, setSidebar } = useGlobalState();
  const sidebarRef = useRef(null);
  useOutsideClick(sidebarRef, () => setSidebar(false));
  
  return(
    <div className={styles.fileManager} ref={sidebarRef}>
      <FileTree/>
    </div>
  );
}
