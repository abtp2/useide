import styles from "./page.module.css";
import Navbar from "@/components/layout/Navbar";
import Navtabs from "@/components/layout/Navtabs";
import CodeEditor from "@/components/editor/Editor";

export default function Home() {
  return (
    <>
      <Navbar/>
      <Navtabs/>
      <CodeEditor/>
    </>
  );
}
