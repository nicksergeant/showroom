compile:
	node_modules/browserify/bin/cmd.js -t reactify static/src/app.js -o static/dist/bundle.js -v
	node_modules/jsmin/bin/jsmin static/dist/bundle.js > static/dist/bundle.min.js

deploy:
	docker build -t showroom/ui .
	docker push showroom/ui
	ssh root@server.showroom.is 'docker pull showroom/ui'
	ssh root@server.showroom.is 'docker rm -f $$(docker ps -q)'
	ssh root@server.showroom.is 'docker run -d -p 80:8888 --restart=always showroom/ui'

restart:
	ssh root@server.showroom.is 'docker restart $$(docker ps -q)'

run:
	nodemon --ignore static/ &
	watchify -t reactify static/src/app.js -o static/dist/bundle.js -v

.PHONY: deploy restart run
