const Fastify = require('fastify');
const path = require('path');
const fastify = Fastify({ logger: true });

fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/', 
});

fastify.get('/favicon.ico', (request, reply) => {
  reply.code(204).send(); 
});

// Start the server
fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running at ${address}`);
});
