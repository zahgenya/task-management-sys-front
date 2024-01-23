import request from 'supertest';
import express from 'express';
import { getTestTasks } from '../src/controllers/taskController';
import { getAllTestTasks } from '../src/queries';

jest.mock('../src/queries', () => ({
  getAllTestTasks: jest.fn(),
}));

const app = express();

app.get('/testTasks', getTestTasks);

describe('GET /testTasks route', () => {
  test('returns a list of tasks', async () => {
    (getAllTestTasks as jest.Mock).mockResolvedValue([
      { id: '1', title: 'Task 1', description: 'Description 1', status: 'TODO' },
    ]);

    const response = await request(app).get('/testTasks');

    expect(response.status).toBe(200);

    expect(response.body).toEqual([
      { id: '1', title: 'Task 1', description: 'Description 1', status: 'TODO' },
    ])
  })

  test('handles errors gracefully', async () => {
    (getAllTestTasks as jest.Mock).mockRejectedValue(new Error('Some error'));

    const response = await request(app).get('/testTasks');

    expect(response.status).toBe(500);

    expect(response.body).toEqual({ error: 'Internal server error' });
  });
})

