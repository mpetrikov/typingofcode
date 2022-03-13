import React, { useState, useEffect } from "react";
import cn from "classnames";

import { getCode } from "./code";
import styles from "./codetext.module.css";

interface CodeTextProps {
  styles: string;
}

export const CodeText = (props: CodeTextProps) => {
  const [code, setCode] = useState<string[]>([]);
  useEffect(() => {
    const { code: newCode } = getCode();
    setCode(newCode);
  }, []);

  return (
    <div className={cn(props.styles, styles.code)}>
      {code.map((line) => (
        <p className={styles.codeLine}>{line}</p>
      ))}
    </div>
  );
};
