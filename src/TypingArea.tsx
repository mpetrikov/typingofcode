import React from "react";
import styles from "./typingarea.module.css";

interface TypingAreaProps {
  styles: string;
}

export const TypingArea = (props: TypingAreaProps) => {
  return (
    <div className={props.styles}>
      <input type="text" className={styles.input} />
    </div>
  );
};
