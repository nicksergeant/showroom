Showroom UI
===========

The UI for [Showroom](http://showroom.is).

### Run:

1. `npm install`
2. `make run`

### Deploy:

A new Docker build is triggered upon Git push, and we run a [Conduit](https://github.com/ehazlett/conduit)
container on the server that will auto-refresh the app container after the build
is finished.

You can view the status of any builds in progress on [Docker Hub](https://registry.hub.docker.com/u/showroom/ui/builds_history/96275/).
