import React, { useState, useCallback, useEffect } from "react";

import styles from "./app.module.css";
import { CodeViewer } from "./components/code-viewer/CodeViewer";
import { TypingArea } from "./components/typing-area/TypingArea";
import { useGetCode } from "./domain/source-code-getter";
import { useTypingChecker } from "./domain/typing-checker";

function App() {
  const [text, setText] = useState("");
  const [isTypingCorrect, setIsTypingCorrect] = useState(true);

  const { code, currentBlockPosition, goToNextWordOrFinish } = useGetCode();
  const { isFinishTyping, checkTypingCorrectness } = useTypingChecker();

  useEffect(() => {
    if (
      code.length > 0 &&
      code[currentBlockPosition.row][currentBlockPosition.position].trim() ===
        ""
    ) {
      goToNextWordOrFinish();
    }
  }, [code]);

  const setNewText = useCallback(
    (newInputEvent: React.ChangeEvent<HTMLInputElement>) => {
      const inputText = newInputEvent.target.value;
      const currentOriginalText =
        code[currentBlockPosition.row][currentBlockPosition.position];

      if (!isFinishTyping(inputText)) {
        setText(inputText);
      }

      if (inputText.slice(0, inputText.length - 1) === currentOriginalText) {
        setText("");
        goToNextWordOrFinish();
        setIsTypingCorrect(true);
        return;
      }

      const typingCorrectnessData = checkTypingCorrectness(
        currentOriginalText,
        inputText
      );
      setIsTypingCorrect(typingCorrectnessData.isCorrect);
    },
    [
      code,
      setText,
      goToNextWordOrFinish,
      currentBlockPosition,
      checkTypingCorrectness,
    ]
  );

  return (
    <div className={styles.application}>
      <CodeViewer
        styles={styles.codeText}
        code={code}
        currentBlockPosition={currentBlockPosition}
      ></CodeViewer>
      <TypingArea
        styles={styles.typingArea}
        text={text}
        setText={setNewText}
        isTypingCorrect={isTypingCorrect}
      ></TypingArea>
    </div>
  );
}

export default App;
