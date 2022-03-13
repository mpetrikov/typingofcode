import React from "react";
import styles from "./app.module.css";
import { CodeText } from "./CodeText";
import { TypingArea } from "./TypingArea";

function App() {
  return (
    <div className={styles.application}>
      <TypingArea styles={styles.typingArea}></TypingArea>
      <CodeText styles={styles.codeText}></CodeText>
    </div>
  );
}

export default App;
