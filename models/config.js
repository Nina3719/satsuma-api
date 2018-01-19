module.exports = {
    port: 3000,
    dbUrl: 'localhost:27017',

    // secret for creating tokens
    token_secret: process.env.TOKEN_SECRET || 'reughdjsasdkpmasipkmsdfadf',
};
