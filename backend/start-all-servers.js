const { spawn } = require('child_process');
const path = require('path');
const { exec } = require('child_process');

// Array of server configurations
const servers = [
    { name: 'Server 1', port: 3000, path: './backend/bk1' },
    { name: 'Server 2', port: 3001, path: './backend/bk2' },
    { name: 'Server 3', port: 3002, path: './backend/bk3' },
    { name: 'Server 4', port: 3003, path: './backend/bk4' },
    { name: 'Server 5', port: 3004, path: './backend/bk5' },
    { name: 'Server 6', port: 3005, path: './backend/bk6' },
    { name: 'Server 7', port: 3006, path: './backend/bk7' },
    { name: 'React Backend', port: 4000, path: './backendforreact' }
];

// Function to start a server
function startServer(server) {
    // Use index.js for bk6, server.js for others
    const entry = (server.port === 3005) ? 'index.js' : 'server.js';
    const serverProcess = spawn('node', [entry], {
        cwd: path.join(__dirname, server.path),
        stdio: 'pipe'
    });

    serverProcess.stdout.on('data', (data) => {
        const output = data.toString().trim();
        console.log(`\x1b[36m[${server.name}]\x1b[0m ${output}`);
        
        // Open browser for Server 1 when it's ready
        if (server.name === 'Server 1' && output.includes('Server is running on port 3000')) {
            console.log('\x1b[32m🌐 Opening Server 1 in your default browser...\x1b[0m');
            const url = 'http://localhost:3000';
            const command = process.platform === 'win32' ? `start ${url}` : `open ${url}`;
            exec(command);
        }
    });

    serverProcess.stderr.on('data', (data) => {
        console.error(`\x1b[31m[${server.name} Error]\x1b[0m ${data.toString().trim()}`);
    });

    serverProcess.on('close', (code) => {
        console.log(`\x1b[33m[${server.name}] Server stopped with code ${code}\x1b[0m`);
    });

    return serverProcess;
}

// Start all servers
console.log('\x1b[35m🚀 Starting all servers...\x1b[0m\n');

const serverProcesses = servers.map(server => {
    console.log(`\x1b[32mStarting ${server.name} on port ${server.port}...\x1b[0m`);
    return startServer(server);
});

// Handle process termination
process.on('SIGINT', () => {
    console.log('\n\x1b[33m🛑 Stopping all servers...\x1b[0m');
    serverProcesses.forEach(process => process.kill());
    process.exit();
});

// Display server URLs
console.log('\n\x1b[36m📱 روابط الخوادم:\x1b[0m');
console.log('\x1b[35m==========================================\x1b[0m');
servers.forEach(server => {
    console.log(`\x1b[32m${server.name}:\x1b[0m http://localhost:${server.port}`);
});
console.log('\x1b[35m==========================================\x1b[0m');
console.log('\x1b[33m[Dashboard] افتح مباشرة: http://localhost:3005/dashboard.html\x1b[0m');
console.log('\x1b[33m[React Backend] API الرئيسي: http://localhost:4000/api\x1b[0m');
console.log('\n\x1b[32m✨ جميع الخوادم تعمل بنجاح!\x1b[0m');
console.log('\x1b[33mاضغط Ctrl+C لإيقاف جميع الخوادم\x1b[0m\n'); 