import React, { useState, useCallback, useEffect } from "react";

import styles from "./app.module.css";
import { CodeText } from "./CodeText";
import { TypingArea } from "./TypingArea";
import { useGetCode } from "./code";

function App() {
  const [text, setText] = useState("");
  const { code, currentBlockPosition, goToNextWordOrFinish } = useGetCode();

  useEffect(() => {
    if (
      code.length > 0 &&
      code[currentBlockPosition.row][currentBlockPosition.position].trim() ===
        ""
    ) {
      goToNextWordOrFinish();
    }
  }, [code]);

  const test = useCallback(() => {
    console.log("code test", code);
  }, [code]);

  test();

  const setNewText = useCallback(
    (newInputEvent: React.ChangeEvent<HTMLInputElement>) => {
      const text = newInputEvent.target.value;
      const textLength = text.length;

      // check if part of block typing wrong

      console.log(text);
      console.log(code);

      if (text[textLength - 1] !== " ") {
        setText(text);
        return;
      }

      if (
        text.trim() ===
        code[currentBlockPosition.row][currentBlockPosition.position]
      ) {
        setText("");
        goToNextWordOrFinish();
      }
    },
    [code, setText, goToNextWordOrFinish, currentBlockPosition]
  );

  return (
    <div className={styles.application}>
      <CodeText
        styles={styles.codeText}
        code={code}
        currentBlockPosition={currentBlockPosition}
      ></CodeText>
      <TypingArea
        styles={styles.typingArea}
        text={text}
        setText={setNewText}
      ></TypingArea>
    </div>
  );
}

export default App;
