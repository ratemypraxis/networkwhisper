const Fastify = require('fastify');
const path = require('path');
const fs = require('fs');
const fastify = Fastify();

// Serve static files (including the video file)
fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/', // Serve files from root
});

// Handle file uploads
fastify.post('/upload', async (request, reply) => {
  let data = Buffer.alloc(0);
  request.raw.on('data', chunk => {
    data = Buffer.concat([data, chunk]);
  });
  request.raw.on('end', () => {
    // Optionally save or process the uploaded data
    reply.send({ status: 'success' });
  });
});

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running at ${address}`);
});
