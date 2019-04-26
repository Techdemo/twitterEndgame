module.exports = {
    ENV: process.env.NODE_ENV || 'production',
    PORT: process.env.PORT || 4000,
    URL: process.env.BASE_URL || 'http://localhost:4000',
    MONGODB_URI: process.env.MONGO_URI || 'mongodb://admin:abc123!@ds147096.mlab.com:47096/avengers'
}