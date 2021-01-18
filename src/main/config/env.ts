export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/clean-node-api',
  port: 5050,
  jwtSecret: process.env.JWT_SECRET || 'mIlao(1$0.!LL2F'
}
