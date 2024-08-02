import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Who Slow v2</h1>
      <h2>About</h2>
      <p>Playing board games? Find out who the slow players are with Who Slow - an app for tracking player turn lengths.</p>
    </main>
  );
}
