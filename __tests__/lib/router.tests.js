'use strict';

const router = require('../../src/lib/router');

describe('router', () => {
  it('has no routes when initialized', () => {
    expect(router.routes.GET).toEqual({});
    expect(router.routes.POST).toEqual({});
    expect(router.routes.DELETE).toEqual({});
  });
  it('accepts new routes with helpers', () => {
    //Ask Instructor about refferencing here
    router.get('/get', () => 'got');
    expect(router.routes.GET['/get']).toBeDefined();
    expect(router.routes.GET['/get']()).toBe('got');

    router.post('/post', () => 'posted');
    expect(router.routes.POST['/post']).toBeDefined();
    expect(router.routes.POST['/post']()).toBe('posted');
  });

  describe('route', () => {
    it('can route callback if method and path match', () => {
      router.get('/test', (req,res) => {res.statusCode = 200; });
      
      let req = {
        method:'GET',
        url: 'http://localhost:5000/test',
      };
      let res = {};

      return router.route(req,res)
        .then(() => {
          expect(res.statusCode).toBe(200);
        });
    });
    it('rejects with 404 to response if method and path do not match', () => {
      let req = {
        method: 'GET',
        url: 'http//localhost:5000/not-found',
      };
      let res = {};

      return expect(router.route(req,res))
        .rejects.toBe(404);
    });
  });
});