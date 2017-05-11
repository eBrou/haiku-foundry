//This script will boot the client from the top-level directory in a manner that is cross-platform.
//https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/
const args = [ 'start' ];
const opts = { stdio: 'inherit', cwd: 'client', shell: true };
require('child_process').spawn('npm', args, opts);
