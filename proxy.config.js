const proxy = [
    {
      context: ['/api'],
      target: 'http://localhost:8080',
      secure: false,
      logleve: 'debug',
      pathRewrite: { '^/api': '' }
    }
  ];module.exports = proxy;