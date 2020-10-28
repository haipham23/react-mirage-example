module.exports = {
  server: {
    command: 'servor build index.html 3000',
    port: 3000,
  },
  launch: {
    dumpio: false, // not printing console.log
    headless: process.env.CI === 'true',
  },
};
