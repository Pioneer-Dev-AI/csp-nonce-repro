// apiRoutes.ts
import { type FastifyInstance } from 'fastify';

export async function apiRouter(fastify: FastifyInstance) {
  fastify.post('/dummy', async () => {
    return { message: "This is a dummy API route" };
  });
}
