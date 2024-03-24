const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');
const Router = require('koa-router');
const cors = require('koa2-cors');
const faker = require('faker');

const app = new Koa();

app.use(koaBody({ json: true, text: true, urlencoded: true }));

app.use(
  cors({
    origin: '*',
    credentials: true,
    'Access-Control-Allow-Origin': true,
    allowMethods: ['GET'],
  })
);

const router = new Router();

router.get('/messages/unread', async (ctx) => {
  const messages = [];
  
  const random = Math.floor(Math.random() * 4);
  for (let i = 0; i < random; i +=1) {
    const message = {
      id: faker.datatype.uuid(),
      from: faker.internet.email(),
      subject: faker.lorem.words(),
      body: faker.lorem.sentence(),
      received: Date.now(),
    };
    messages.push(message);
  };

  const result = {
    status: 'ok',
    timestamp: Date.now(),
    messages,
  };
  ctx.response.body = result;
});

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 7070;
const server = http.createServer(app.callback());
server.listen(port, () => console.log('Server started'));