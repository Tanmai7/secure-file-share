// models/User.js
// run this separately to generate password hash
const bcrypt = require('bcryptjs');
bcrypt.hash('123456', 10).then(console.log);

const users = [
{
    id: 1,
    username: 'tanmai',
    password: '$2a$10$abcxyz...', // use bcrypt to hash and store
},
];

module.exports = users;
