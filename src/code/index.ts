import { useState, useEffect, useCallback } from 'react';

import { mockData } from './mock';

export const useGetCode = () => {
    const [row, setRow] = useState(0);
    const [position, setPosition] = useState(0);
    const [code, setCode] = useState<string[][]>([]);

    useEffect(() => {
        let splittedDataByLines = mockData.code.split('\n');
        let firstNotEmptyLine = 0;
        for (let i = 0; i < splittedDataByLines.length; i++) {
            if (splittedDataByLines[i].trim() !== '') break;

            firstNotEmptyLine += 1;
        }

        splittedDataByLines = splittedDataByLines.slice(firstNotEmptyLine);

        setCode(splittedDataByLines.map(codeLine => codeLine.split(' ')));
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
        } while (code[newRow][newPosition].trim() === '');

        if (!isFinished) {
            setRow(newRow);
            setPosition(newPosition);
        } else {
            alert('finished!!');
            // TODO: show finished status
        }
    }, [row, position, setRow, setPosition, code]);

    return {
        code,
        path: mockData.path,
        currentBlockPosition: {
            row,
            position
        },
        goToNextWordOrFinish
    }
}
