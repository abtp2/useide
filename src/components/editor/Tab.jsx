"use client";
import styles from "./EditorLayout.module.css";
import Image from "next/image";
import { X } from "lucide-react";
export default function Tab({icon,title,onClose}) {
  return (
    <div className={styles.tab}>
      <i className={`devicon-${icon}-plain`}></i>
      <span>{title}</span>
      <X onClick={onClose}/>
    </div>
  );
}


