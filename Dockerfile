FROM node:0.10-onbuild
ENV NODE_ENV production
RUN bash -c "node_modules/browserify/bin/cmd.js -t reactify static/src/app.js -o static/bundle.js"
RUN bash -c "node_modules/jsmin/bin/jsmin static/bundle.js > static/bundle.min.js"
EXPOSE 8888
