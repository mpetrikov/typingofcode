import { useState, useEffect, useCallback } from 'react';
const esprima = require("esprima");

import { CodeType, Block, Literal } from 'types';

import { mockData } from './mock';
import { getPureBlockText } from './helpers';

export const useGetCode = () => {
    const [row, setRow] = useState(0);
    const [position, setPosition] = useState(0);
    const [code, setCode] = useState<CodeType>([]);
    const [isFinishedTyping, setIsFinishedTyping] = useState(false);

    useEffect(() => {
        let splittedDataByLines = mockData.code.split('\n');

        let firstNotEmptyLine = 0;
        for (let i = 0; i < splittedDataByLines.length; i++) {
            if (splittedDataByLines[i].trim() !== '') break;

            firstNotEmptyLine += 1;
        }

        splittedDataByLines = splittedDataByLines.slice(firstNotEmptyLine);

        const localCode: CodeType = new Array(splittedDataByLines.length);
        let numberLine = 0;
        for (let line of splittedDataByLines) {
            const splittedLine = line.split(' ')

            const tokenizedLine = esprima.tokenize(line);

            let blockStartPosition = 0;
            const lineBlocks: Block[] = [];
            for (let block of splittedLine) {
                const literal: Literal = {
                    start: blockStartPosition,
                    end: blockStartPosition + block.length,
                    text: block,
                    color: ['red', 'green', 'blue', 'yellow', 'purple'][Math.floor(Math.random() * 5)],
                }
                lineBlocks.push([literal]);

                blockStartPosition += block.length + 1;
            }
            localCode[numberLine] = lineBlocks;

            numberLine++;
        }

        setCode(localCode);
    }, []);

    const goToNextWordOrFinish = useCallback(() => {
        let newPosition = position;
        let newRow = row;
        let isFinished = false;

        do {
            newPosition += 1;

            if (newPosition >= code[newRow].length) {
                newRow += 1;
                newPosition = 0;
                if (newRow >= code.length) {
                    isFinished = true;
                    break;
                }
            }
        } while (getPureBlockText(code[newRow][newPosition]) === '');

        if (!isFinished) {
            setRow(newRow);
            setPosition(newPosition);
        } else {
            setIsFinishedTyping(true);
        }
    }, [row, position, setRow, setPosition, code]);

    const currentPureBlockText = code.length > 0 ? getPureBlockText(code[row][position]) : '';

    return {
        code,
        path: mockData.path,
        currentBlockPosition: {
            row,
            position
        },
        currentPureBlockText,
        goToNextWordOrFinish,
        isFinishedTyping
    }
}
