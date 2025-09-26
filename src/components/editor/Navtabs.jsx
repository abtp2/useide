"use client";
import styles from "./EditorLayout.module.css";
import Tab from "@/components/editor/Tab";
export default function Navtabs() {
  return (
    <div className={styles.navtabs}>
        <Tab icon="javascript" title="untitled.js" ext="js" onClose={()=>{}}/>
        <Tab icon="javascript" title="untitled.js" ext="js" onClose={()=>{}}/>
        <Tab icon="javascript" title="untitled.js" ext="js" onClose={()=>{}}/>
        <Tab icon="javascript" title="untitled.js" ext="js" onClose={()=>{}}/>
        <Tab icon="javascript" title="untitled.js" ext="js" onClose={()=>{}}/>
    </div>
  );
}