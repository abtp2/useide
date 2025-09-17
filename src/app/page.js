import styles from "./page.module.css";
import Navbar from "@/components/layout/Navbar";
import Navtabs from "@/components/layout/Navtabs";
import CodeEditor from "@/components/editor/Editor";
import Sidebar from "@/components/layout/Sidebar";
import { GlobalProvider } from "./GlobalState";


export default function Home() {
  return (
    <>
      <GlobalProvider>
        <div className={styles.layout}>
          <div className={styles.leftLayout}>
            <Sidebar/>
          </div>
          <div className={styles.rightLayout}>
            <Navbar/>
            <Navtabs/>
            <CodeEditor/>
          </div>
        </div>
      </GlobalProvider>
    </>
  );
}
