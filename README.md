Showroom UI
===========

The UI for [Showroom](https://new.showroom.is).

### Running

1. `npm install`
2. `make run`

### Deploying

A new Docker build is triggered upon Git push, and we run a [Conduit](https://github.com/ehazlett/conduit)
container on the server that will auto-refresh the app container after the build
is finished.

You can view the status of any builds in progress on [Docker Hub](https://registry.hub.docker.com/u/showroom/ui/builds_history/96275/).

### Provisioning

To provision a new server for auto deployment, run the app container:

- `docker run --name=showroom -d -p 80:8888 --restart=always showroom/ui`

Then, run the [Conduit](https://github.com/ehazlett/conduit) container (and
use a unique token):

- `docker run --name=conduit -d -p 8080:8080 --restart=always -v /var/run/docker.sock:/var/run/docker.sock ehazlett/conduit -r showroom/ui -t <token>`

Finally, add the webhook to the [build repository's webhooks](https://registry.hub.docker.com/u/showroom/ui/settings/webhooks/)
using the token used in the Conduit container run command. The webhook will be
in the following format:

- `http://server.showroom.is:8080/?token=<token>`

### Slack notifications

To get Slack notifications when containers start, stop, etc:

- `docker run --name=slack-docker -d --restart=always -e webhook=<webhookurl> -v /var/run/docker.sock:/var/run/docker.sock nicksergeant/slack-docker`
