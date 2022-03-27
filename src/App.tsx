import React, { useState, useCallback, useEffect } from "react";

import styles from "./app.module.css";
import { CodeViewer } from "./components/code-viewer/CodeViewer";
import { TypingArea } from "./components/typing-area/TypingArea";
import { useGetCode } from "./domain/source-code-getter";
import { useTypingChecker } from "./domain/typing-checker";

function App() {
  const [text, setText] = useState("");
  const [isTypingCorrect, setIsTypingCorrect] = useState(true);

  const {
    code,
    currentBlockPosition,
    currentPureBlockText,
    goToNextWordOrFinish,
    isFinishedTyping,
  } = useGetCode();

  const { checkTypingCorrectness } = useTypingChecker();

  useEffect(() => {
    if (
      code.length > 0 &&
      code[currentBlockPosition.row][currentBlockPosition.position].length === 0
    ) {
      goToNextWordOrFinish();
    }
  }, [code, currentBlockPosition, goToNextWordOrFinish]);

  const setNewText = useCallback(
    (newInputEvent: React.ChangeEvent<HTMLInputElement>) => {
      const inputText = newInputEvent.target.value;

      setText(inputText);

      if (
        inputText[inputText.length - 1] === " " &&
        inputText.trimEnd() === currentPureBlockText
      ) {
        setText("");
        goToNextWordOrFinish();
        setIsTypingCorrect(true);
        return;
      }

      const typingCorrectnessData = checkTypingCorrectness(
        currentPureBlockText,
        inputText
      );
      setIsTypingCorrect(typingCorrectnessData.isCorrect);

      // TODO: create sound hook
      if (typingCorrectnessData.isCorrect === false) {
        const audio = new Audio("assets/wrongtyping.mp3");
        audio.volume = 0.2;
        audio.play();
      }
    },
    [
      setText,
      goToNextWordOrFinish,
      checkTypingCorrectness,
      currentPureBlockText,
    ]
  );

  return (
    <div className={styles.application}>
      <CodeViewer
        styles={styles.codeText}
        code={code}
        currentBlockPosition={currentBlockPosition}
        isFinishedTyping={isFinishedTyping}
      ></CodeViewer>
      {!isFinishedTyping && (
        <TypingArea
          styles={styles.typingArea}
          text={text}
          setText={setNewText}
          isTypingCorrect={isTypingCorrect}
        ></TypingArea>
      )}
    </div>
  );
}

export default App;
