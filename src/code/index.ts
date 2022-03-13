import { mockData } from './mock';

interface GetCode {
    code: string[];
    path: string;
}


export const getCode = (): GetCode => {
    const code = mockData.code;
    const splitCode = code.split('\n');

    return {
        code: splitCode,
        path: mockData.path
    }
}