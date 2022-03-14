import React, { useState, useCallback } from "react";
import styles from "./typingarea.module.css";

interface TypingAreaProps {
  styles: string;
  text: string;
  setText: (value: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TypingArea = (props: TypingAreaProps) => {
  return (
    <div className={props.styles}>
      <input
        type="text"
        className={styles.input}
        value={props.text}
        onChange={props.setText}
      />
    </div>
  );
};
