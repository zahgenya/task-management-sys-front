import {jest, expect, describe, it} from '@jest/globals';
import {getAllTasks} from './queries';
import {db} from './database';

const testAllTask = [{id:1}, {id:2}];

jest.mock('./database', () => {
    return {
        db: {
            any: jest.fn(() => testAllTask),
            one: jest.fn(),
        }
    }
})


describe('Test getAllTasks', () => {
    it('test query', async () => {
        const result = await getAllTasks();

        expect(db.any).toHaveBeenCalled();
        expect(db.any).toHaveBeenLastCalledWith(`SELECT * FROM testTasks;`);

        expect(result).toHaveLength(2);
    })
})
