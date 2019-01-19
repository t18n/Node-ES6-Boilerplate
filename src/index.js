import chalk from 'chalk';
import cluster from 'cluster';
import os from 'os';

// Get number of CPUs available
const numCPUs = os.cpus().length;

// Spawning the workers if a cluster is a `master`
if (cluster.isMaster) {
  console.log(chalk.bgWhite.blue(`Master Process: ${chalk.bold(process.pid)} is running.`))
  for (var i = 0; i < numCPUs; i++) {
    // Create a worker
    cluster.fork();
  }

// Define `workers` tasks
} else {
  console.log(chalk.green(`🐣 Worker ${chalk.bold(process.pid)} is created`));
  require('./server');
};

// If 1 or more than 1 `workers` dies, log it and Restart a process.
cluster.on('exit', (worker, code, signal) => {
  console.log(chalk.redBright(`💩 Worker ${worker.process.pid} 💀 with code: ${code}, signal ${signal}.`));
  console.log(chalk.bold.yellowBright('🌀 Respawning worker...'));
  cluster.fork();
});
