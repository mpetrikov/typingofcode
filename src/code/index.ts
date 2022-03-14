import { useState, useEffect, useCallback } from 'react';

import { mockData } from './mock';

export const useGetCode = () => {
    const [row, setRow] = useState(0);
    const [position, setPosition] = useState(0);
    const [code, setCode] = useState<string[][]>([]);

    useEffect(() => {
        setCode(mockData.code.split('\n').map(codeLine => codeLine.split(' ')));
    }, []);

    const goToNextWordOrFinish = useCallback(() => {
        const newPosition = position + 1;
        console.log('calc newPosition');
        if (newPosition >= code[row].length) {
            // new line or finish typing
            const newRow = row + 1;
            if (newRow >= code.length) {
                // finish typing
            } else {
                setRow(newRow);
                setPosition(0);
            }
        } else {
            setPosition(newPosition);
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
