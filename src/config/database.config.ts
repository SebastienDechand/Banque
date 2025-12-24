export const getDatabaseConfig = () => ({
  uri: process.env.MONGODB_URI || 'mongodb://admin:password123@localhost:27017',
  dbName: process.env.MONGODB_DATABASE || 'banque',
});
