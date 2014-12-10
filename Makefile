restart:
	ssh root@server.showroom.is 'docker restart $$(docker ps -q)'

run:
	echo "Running on localhost:8888"
	nodemon --ignore static/ &
	node_modules/watchify/bin/cmd.js -t reactify static/src/js/app.js -o static/bundle.js -v

.PHONY: deploy restart run
