import cluster from 'cluster';
import os from 'os';
import { logWarn, logInfo, logError, logDebug } from 'src/utils/logger';

// Get number of CPUs available
const numCPUs = os.cpus().length;

// Spawning the workers if a cluster is a `master`
if (cluster.isMaster) {
  logInfo(`Master Process: ${process.pid} is running.`)
  for (var i = 0; i < numCPUs; i++) {
    // Create a worker
    cluster.fork();
  }

// Define `workers` tasks
} else {
  logInfo(`🐣 Worker ${process.pid} is created`);
  require('./server');
};

// If 1 or more than 1 `workers` dies, log it and Restart a process.
cluster.on('exit', (worker, code, signal) => {
  logError(`💩 Worker ${worker.process.pid} 💀 with code: ${code}, signal ${signal}.`);
  logInfo('🌀 Respawning worker...');
  cluster.fork();
});
