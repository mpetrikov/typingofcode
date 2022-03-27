import { Block } from 'types';

export const getPureBlockText = (block: Block) => {
    let text = '';
    for (let literal of block) {
        text += literal.text;
    }

    return text;
}