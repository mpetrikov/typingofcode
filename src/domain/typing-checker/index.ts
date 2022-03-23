import { useState, useEffect, useCallback } from 'react';

import { CheckTypingCorrectness } from 'types';

export const useTypingChecker = () => {
    const isFinishTyping = (currentInputText: string) => {
        return currentInputText[currentInputText.length - 1] === " ";

        //TODO: check Enter
    }

    const checkTypingCorrectness = (originalText: string, inputText: string): CheckTypingCorrectness => {
        if (originalText === inputText) {
            return {
                isCorrect: true,
                wrongPosition: -1,
            }
        }

        for (let i = 0; i < inputText.length; i++) {
            if (originalText[i] !== inputText[i]) {
                return {
                    isCorrect: false,
                    wrongPosition: i,
                }
            }
        }

        return {
            isCorrect: true,
            wrongPosition: -1
        }
    }

    return {
        isFinishTyping,
        checkTypingCorrectness
    }
}
