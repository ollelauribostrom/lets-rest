# Lets REST! - ES6 RESTful Express API boilerplate

This is a simple boilerplate for quickly setting up a REST API with ES6 and Express + tests.
Forked/inspired by/built on [express-es6-rest-api](https://github.com/developit/express-es6-rest-api)

- ES6 support via [babel](https://babeljs.io)
- CORS support via [cors](https://github.com/troygoode/node-cors)
- Body Parsing via [body-parser](https://github.com/expressjs/body-parser)
- Rate limit via [express-rate-limit](https://github.com/nfriedly/express-rate-limit)
- Security with HTTP headers via [helmet](https://github.com/helmetjs/helmet)
- Logging via [morgan](https://github.com/expressjs/morgan) (dev: to console, production: to rotating log file)
- Linting via [ESLint](http://eslint.org/) (airbnb style guide)
- Tests via [mocha](https://mochajs.org), [chai](http://chaijs.com/), [nyc](https://github.com/istanbuljs/nyc)
- Hook on whatever database you like!

Getting Started
---------------
```sh
# clone it
git clone git@github.com:ollelauribostrom/lets-rest.git
cd lets-rest

# Make it your own
rm -rf .git && git init && npm init

# Install dependencies
npm install

# Start development live-reload server
npm run dev
```

Commands
--------
- `npm run dev`: Start development live-reload server
- `npm run build`: Build project to /dist folder
- `npm start`: Build and run project from /dist folder as in production
- `npm test`: Run tests
- `npm run coverage`: Run test coverage using nyc, outputs report to /test/coverage
- `npm run lint`: Run eslint on /src + / test


Docker Support
------
```sh
cd lets-rest

# Build your docker
docker build -t es6/api-service .
#            ^      ^           ^
#          tag  tag name      Dockerfile location

# run your docker
docker run -p 8080:8080 es6/api-service
#                 ^            ^
#          bind the port    container tag
#          to your host
#          machine port   

```

Publish to now
--------------
```sh
# install now global
npm install now -g
cd lets-rest
now --docker OR now --npm
wait a bit
--> visit url
```

DEMO: 

License
-------
MIT
