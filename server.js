const Fastify = require('fastify');
const path = require('path');
const fastify = Fastify({ logger: true });

// Serve static files (including the image file and HTML)
fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/', // Serve files from root
});

// Handle favicon requests to avoid 404 errors
fastify.get('/favicon.ico', (request, reply) => {
  reply.code(204).send(); // No content for favicon
});

// Start the server
fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running at ${address}`);
});
