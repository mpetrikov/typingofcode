type CodeType = string[][];

export interface CodeTextProps {
    styles: string;
    code: CodeType;
    currentBlockPosition: {
        row: number;
        position: number;
    }
};

export interface CheckTypingCorrectness {
    isCorrect: boolean;
    wrongPosition: number;
}