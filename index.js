require('dotenv').config();

const server = require('./api/server.js');
// const server1 = require('./api/server.js');

console.log(`DB_ENV = ${process.env.DB_ENV}`);


const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n** server up on port ${port} **\n`));

// server1.listen(4000, () => { console.log('listening for server 1 on port 4000...') });
