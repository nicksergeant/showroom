all:
	jsx static/src static/build
	browserify static/build/app.js -o static/dist/bundle.js
	node_modules/jsmin/bin/jsmin static/dist/bundle.js > static/dist/bundle.min.js

deploy:
	docker build -t showroom/ui .
	docker push showroom/ui
	ssh root@server.showroom.is 'docker pull showroom/ui'
	ssh root@server.showroom.is 'docker rm -f $$(docker ps -q)'
	ssh root@server.showroom.is 'docker run -d -p 80:8888 --restart=always showroom/ui'

restart:
	ssh root@server.showroom.is 'docker restart $$(docker ps -q)'

watch:
	fswatch -o --latency=0.1 static/src | xargs -n1 -I{all} make

.PHONY: all deploy restart watch
