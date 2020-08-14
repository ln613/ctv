const { last, pipe, toPairs, fromPairs, map, groupBy, isNil, init, range, unnest, is } = require('ramda');
const axios = require('axios').default;
const { tap, extractUrl, serial, sort, sortBy, shuffle, use, fetch } = require('@ln613/util');

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  'Access-Control-Allow-Methods': 'GET,OPTIONS,POST,PUT,PATCH,DELETE,COPY,PURGE'
};

const res = (body, code) => ({
  statusCode: code || 200,
  headers: {
    ...cors,
    //...(isDev ? cors : {}),
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(body)
});

const url = 'http://chaochaolive.icntv.xyz/api2/chaochaolive.icntv.xyz/{0}.js';

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const q = event.queryStringParameters;
  //const body = trynull(_ => JSON.parse(event.body));
  const method = event.httpMethod;
  let r = {};

  try {
    if (method === 'GET') {
      switch (q.type) {
        case 'cats':
          r = await fetch(url.replace('{0}', 'indexchs'));
          break;
        case 'chs':
          r = await fetch(url.replace('{0}', 'getchs/' + q.cat));
          break;
        default:
          break;
      }
    }

    return res(isNil(r) ? 'Done' : r);
  }
  catch (e) {
    tap(e);
    return res(e, 500);
  }
};
