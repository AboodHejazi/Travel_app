
import request from 'supertest';
import app from '../../server/server.js';



describe('Server Test', () => {
  it('should return a 200 status', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
  });
});
