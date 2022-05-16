FROM node:15-alpine
LABEL MAINTAINER="Pablo Villaverde <https://github.com/pvillaverde>"
## Install App dependencies
## Using wildcard to copy both package.json and package-lock.json
## This forces Docker not to use cache when we change our dependencies
ADD package*.json /tmp/
RUN cd /tmp && npm install
RUN mkdir -p /opt/discordttd && cp -a /tmp/node_modules /opt/discordttd
## Now we copy our App source code, having the dependencies previously cached if possible.
WORKDIR /opt/discordttd
ADD . /opt/discordttd

CMD [ "node", "index.js" ]