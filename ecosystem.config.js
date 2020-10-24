module.exports = {
  apps : [{
    name: "RiegoWebApi",
    script: "./server.js",
    env: {
      NODE_ENV: "development"
    },
    env_production: {
      NODE_ENV: "production"
    }
  }]
}