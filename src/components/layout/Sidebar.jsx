"use client";
import styles from "./layout.module.css";
import { LuMenu, LuEllipsisVertical, LuPlay} from "react-icons/lu";
import { useGlobalState } from "@/app/GlobalState";
import FileManager from "./FileManager";

export default function Sidebar(){
  const { sidebar, setSidebar } = useGlobalState();
  
  return(
    <div className={`${styles.sidebar} ${sidebar ? styles.sidebarOpen : ""}`}>
      <FileManager/>
    </div>
  );
}
