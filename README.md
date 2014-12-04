Showroom UI
===========

The UI for [Showroom](http://showroom.is).

### Run from build:

1. `docker run -p 8888:8888 showroom/ui`

### Run from source:

1. `git clone https://github.com/showrm/ui.git`
2. `cd ui`
3. `npm install`
4. `node server`

### Compile:

1. `npm install -g browserify jsmin react-tools`
2. `make`

### Watch:

1. `brew install fswatch`
2. `make watch`
