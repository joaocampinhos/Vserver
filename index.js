'use strict';

const Hapi = require('hapi');
const semver = require('semver');

const server = new Hapi.Server();
server.connection({ port: 3000 });

const versions = [
  {
    v: "1.0.0",
    c: {
      "birthdate" : "1991-10-20",
      "country" : "PT",
      "display_name" : "João Campinhos",
      "email" : "joao.campinhos@gmail.com"
    }
  },
  {
    v: "2.0.0",
    c: {
      "birthdate" : "1991-10-20",
      "country" : "PT",
      "display_name" : "João Campinhos",
      "email" : "joao.campinhos@gmail.com",
      "followers" : {
        "total" : 16
      }
    }
  }
];

server.route({
    method: 'GET',
    path: '/api/me',
    handler: function (request, reply) {
      const v = request.headers.version;
      let res;
      for (var i=0; i < versions.length; i++) {
        if (semver.satisfies(versions[i].v,v))
          res = versions[i]
      }
      reply(res.c).header('version',res.v);
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
