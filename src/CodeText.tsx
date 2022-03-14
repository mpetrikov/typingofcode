import React, { useState, useEffect, useCallback } from "react";
import cn from "classnames";
import { CodeTextProps } from "types";

import styles from "./codetext.module.css";

export const CodeText = (props: CodeTextProps) => {
  const isCurrentWord = useCallback(
    (row, position) => {
      return (
        props.currentBlockPosition.row === row &&
        props.currentBlockPosition.position === position
      );
    },
    [props.currentBlockPosition]
  );

  return (
    <div className={cn(props.styles, styles.code)}>
      {props.code.map((line, rowIndex) => (
        <p className={styles.codeLine}>
          {line.map((word, linePosition) => (
            <span
              className={cn(
                isCurrentWord(rowIndex, linePosition) && styles.activeWord
              )}
            >
              {word}&nbsp;
            </span>
          ))}
        </p>
      ))}
    </div>
  );
};
