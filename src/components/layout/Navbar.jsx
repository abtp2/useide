import styles from "./layout.module.css";
import { LuMenu, LuEllipsisVertical, LuPlay} from "react-icons/lu";


export default function Navbar(){
  return(
    <div className={styles.navbar}>
      <LuMenu/>
      <div className={styles.navbarFileName}>
        <h1>untitled.js</h1>
        <p>../admin/src/layout/untitled.js</p>
      </div>
      <LuPlay/>
      <LuEllipsisVertical/>
    </div>
  );
}
