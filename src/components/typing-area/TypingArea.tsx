import React, { useRef, useEffect } from "react";
import cn from "classnames";
import styles from "./typingarea.module.css";

interface TypingAreaProps {
  styles: string;
  text: string;
  setText: (value: React.ChangeEvent<HTMLInputElement>) => void;
  isTypingCorrect: boolean;
}

export const TypingArea = (props: TypingAreaProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  });

  return (
    <div className={props.styles}>
      <input
        type="text"
        className={cn(styles.input, { [styles.error]: !props.isTypingCorrect })}
        value={props.text}
        onChange={props.setText}
        ref={inputRef}
      />
    </div>
  );
};
