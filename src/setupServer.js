import { createServer } from 'miragejs';

const setupServer = ({ environment = 'test' } = {}) => {
  const server = createServer({
    environment,

    routes() {
      this.post('http://local.mock/api/users', () => ({ id: 'new-user' }));
    },
  })

  return server;
};

export default setupServer;
