import styles from "./editor.module.css";
import Topbar from "@/components/layout/Topbar";
import Navtabs from "@/components/editor/Navtabs";
export default function Editor() {
  return (
    <div className={styles.editor}>
      <Topbar />
      <Navtabs/>
      <h1>Editor</h1>
    </div>
  );
}