import {jest, expect, describe, it} from '@jest/globals';
import {getAllTasks, someSimpleFunc} from './queries';
import {db} from './database';

jest.mock('./database', () => {
    return {
        db: {
            any: jest.fn(() => ([{id:1}, {id:2}]))
        }
    }
})


describe('test getAllTask', () => {
    it('test mock', async () => {
        const res = db.any('test');

        expect(res).toHaveLength(2);
        expect(db.any).toHaveBeenCalled();

    })

    it('foo bar', async () => {
        const inData = 'someMockData'
        const outData = await someSimpleFunc(inData)


        expect(outData).toBe(inData)

    })
})

describe('Test getAllTasks', () => {
    it('test query', async () => {
        const result = await getAllTasks();

        expect(db.any).toHaveBeenCalled();
        expect(db.any).toHaveBeenCalledTimes(1);

        expect(result).toHaveLength(2);
    })
})
