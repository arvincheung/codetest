const config = require.main.require('./config');
const io = require('socket.io-emitter')({
  host: process.env.NODE_ENV == 'prod' ? config.redis.prodUrl : config.redis.url,
  port: config.redis.port
});

io.redis.on('error', err => console.err(err));

function emit(nsp, data) {
  console.log(`emitting ${nsp} ${JSON.stringify(data)}`);
  io.emit(nsp, data);
}

setInterval(
  () => {
    emit('test', {
      message: 'test'
    });
  },
  5000
);

module.exports = {
  emit
};
