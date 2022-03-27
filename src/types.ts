export type Literal = {
    text: string;
    start: number;
    end: number;
    color: string;
};

export type Block = Literal[];

export type CodeType = Block[][];

export interface CodeTextProps {
    styles: string;
    code: CodeType;
    currentBlockPosition: {
        row: number;
        position: number;
    },
    isFinishedTyping: boolean;
};

export interface CheckTypingCorrectness {
    isCorrect: boolean;
    wrongPosition: number;
}
