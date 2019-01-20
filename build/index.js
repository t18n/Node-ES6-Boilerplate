"use strict";

var _cluster = _interopRequireDefault(require("cluster"));

var _os = _interopRequireDefault(require("os"));

var _logger = require("./utils/logger");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Get number of CPUs available
var numCPUs = _os.default.cpus().length; // Spawning the workers if a cluster is a `master`


if (_cluster.default.isMaster) {
  (0, _logger.logInfo)("Master Process: ".concat(process.pid, " is running."));

  for (var i = 0; i < numCPUs; i++) {
    // Create a worker
    _cluster.default.fork();
  } // Define `workers` tasks

} else {
  (0, _logger.logInfo)("\uD83D\uDC23 Worker ".concat(process.pid, " is created"));

  require("./server");
}

; // If 1 or more than 1 `workers` dies, log it and Restart a process.

_cluster.default.on('exit', function (worker, code, signal) {
  (0, _logger.logError)("\uD83D\uDCA9 Worker ".concat(worker.process.pid, " \uD83D\uDC80 with code: ").concat(code, ", signal ").concat(signal, "."));
  (0, _logger.logInfo)('🌀 Respawning worker...');

  _cluster.default.fork();
});