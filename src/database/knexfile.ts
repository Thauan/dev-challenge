require('ts-node/register');

module.exports = {
    client: 'pg',
    ssl: false,
    debug: true,
    useNullAsDefault: true,
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'root',
        port: 15432,
        database: 'dev_challenge',
        charset: 'utf8'
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        directory: '../database/migrations/',
        extension: 'ts'
    },
    timezone: 'UTC'
};