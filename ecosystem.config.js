module.exports = {
  apps : [
    {
      name: 'kbot',
      script: './dist/client.js',
      watch: false,
      instances: 1,
      autorestart: true,
      max_memory_restart: '250M',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
};
