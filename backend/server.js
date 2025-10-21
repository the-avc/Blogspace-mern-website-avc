import { createServer } from './config/server.js';
import { connectDatabase } from './config/database.js';
import routes from './routes/index.js';

// Create Express server
const server = createServer();

// Connect to database
connectDatabase();

// Use routes
server.use(routes);

const PORT = process.env.PORT || 3000;

// Start server
server.listen(PORT, () => {
    console.log('listening on port -> ' + PORT);
});