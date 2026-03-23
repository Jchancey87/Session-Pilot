const { spawn } = require('child_process');
const fs = require('fs');

const out = fs.openSync('dev-out.log', 'w');
const sub = spawn('npm.cmd', ['run', 'dev'], {
  detached: true,
  stdio: ['ignore', out, out]
});
sub.unref();
