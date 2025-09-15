import Image from 'next/image';
import styles from "./layout.module.css";
import { LuX } from "react-icons/lu";



export default function Navtabs(){
const tabs =[
  {
    name: "index.html",
    lang: "html",
    logo: "/html5-original.svg",
    active: false,
  },
  {
    name: "untitled.js",
    lang: "javascript",
    logo: "/javascript-original.svg",
    active: true,
  },
  {
    name: "style.css",
    lang: "css",
    logo: "/css3-original.svg",
    active: false,
  },
  {
    name: "script.js",
    lang: "javascript",
    logo: "/javascript-original.svg",
    active: false,
  },
  {
    name: "run.py",
    lang: "python",
    logo: "/python-original.svg",
    active: false,
  },
]

  return(
    <div className={`${styles.navtabs} overflow-none`}>
      {tabs.map((tab,index) =>(
        <div key={index} className={`${styles.navtab} ${tab.active && styles.activeNavtab}`}>
          <Image width={15} height={15} src={tab.logo} alt={tab.lang}/>
          <p>{tab.name}</p>
          <LuX/>
        </div>
      ))}
    </div>
  );
}
