FROM node:0.10-onbuild
ENV NODE_ENV production
RUN bash -c "node_modules/browserify/bin/cmd.js -t reactify static/src/app.js -o static/dist/bundle.js"
RUN bash -c "node_modules/jsmin/bin/jsmin static/dist/bundle.js > static/dist/bundle.min.js"
EXPOSE 8888
