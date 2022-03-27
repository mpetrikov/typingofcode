import React, { useCallback } from "react";
import cn from "classnames";

import { CodeTextProps } from "types";

import styles from "./codeviewer.module.css";

export const CodeViewer = (props: CodeTextProps) => {
  const checkIsCurrentBlock = useCallback(
    (row, position) => {
      return (
        props.currentBlockPosition.row === row &&
        props.currentBlockPosition.position === position
      );
    },
    [props.currentBlockPosition]
  );

  const checkIsFutureBlock = useCallback(
    (row, position) => {
      if (row > props.currentBlockPosition.row) return true;
      if (row < props.currentBlockPosition.row) return false;

      return position > props.currentBlockPosition.position;
    },
    [props.currentBlockPosition]
  );

  return (
    <div className={cn(props.styles, styles.code)}>
      {props.code.map((line, lineNumber) => (
        <p className={styles.codeLine} key={lineNumber}>
          {line.map((block, blockNumber) => (
            <span key={blockNumber}>
              {block.map((literal, literalNumber) => {
                const isCurrentBlock = checkIsCurrentBlock(
                  lineNumber,
                  blockNumber
                );
                const isFutureBlock = checkIsFutureBlock(
                  lineNumber,
                  blockNumber
                );

                return (
                  <span
                    className={cn(styles.literal, {
                      [styles.typingFinished]: props.isFinishedTyping,
                      [styles.activeWord]:
                        isCurrentBlock && !props.isFinishedTyping,
                      [styles.futureWord]: isFutureBlock,
                      [styles[literal.color]]:
                        (!isFutureBlock && !isCurrentBlock) ||
                        props.isFinishedTyping,
                    })}
                    key={literalNumber}
                  >
                    {literal.text}
                  </span>
                );
              })}
              &nbsp;
            </span>
          ))}
        </p>
      ))}
    </div>
  );
};
