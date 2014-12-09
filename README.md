Showroom UI
===========

The UI for [Showroom](http://showroom.is).

### Run and develop locally:

1. `npm install`
2. `make run`

### Prerequisites for deploying from a Mac:

1. Install [boot2docker](http://boot2docker.io/).
1. Run `boot2docker start`.
2. Run `boot2docker shellinit`.
3. Copy the `EXPORT` stuff into your shell config (e.g. `~/.bash_profile`).
4. Run `boot2docker stop` and `boot2docker start`.
5. You should get a message that says your environment variables are set correctly.
5. Run `docker login` and use your [Docker Hub](https://hub.docker.com/account/signup/) credentials.


### Troubleshooting

- You may need to `boot2docker stop` and `boot2docker download` to get a fresh boot2docker image.
- You may need to run `boot2docker start` periodically after your computer sleeps and such.

### Deploying:

- `make deploy`
