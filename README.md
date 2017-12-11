# Lets REST! - ES6 RESTful Express API boilerplate
[![Coverage Status](https://coveralls.io/repos/github/ollelauribostrom/lets-rest/badge.svg?branch=master)](https://coveralls.io/github/ollelauribostrom/lets-rest?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/ollelauribostrom/lets-rest/badge.svg)](https://snyk.io/test/github/ollelauribostrom/lets-rest)

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

> ALSO: Docker support & easily published using [now](https://zeit.co/now)

Getting Started
---------------
```sh
# clone it
mkdir my-api
cd my-api
git clone git@github.com:ollelauribostrom/lets-rest.git .

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
- `npm run coveralls`: Run test coverage using nyc & send report to coveralls (must have specified repo_token in .coveralls.yml)
- `npm run lint`: Run eslint


Docker Support
------
```sh
cd my-api

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
cd my-api

# install now globally
npm install now -g

# publish (--docker for dockerfile, --npm for package.json)
now --docker

# wait a bit..
# visit url
```

It's really as simple as that. If you haven't used now before, you will be asked to confirm 
your email. DEMO: https://lets-rest-pdhiuckpip.now.sh/api/v1

> Read more about [now](https://zeit.co/now)

License
-------
MIT
