[![pipeline status](https://gitlab.com/tripetto/forms/examples/react/badges/master/pipeline.svg)](https://gitlab.com/tripetto/forms/examples/react/commits/master)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![docs](https://img.shields.io/badge/docs-website-blue.svg)](https://forms.tripetto.community/collector)
[![chat](https://img.shields.io/gitter/room/nwjs/nw.js.svg)](https://gitter.im/tripetto/forms)

**Demo for implementing the [Tripetto Forms collector](https://www.npmjs.com/package/@tripetto/forms-collector) using [React](https://reactjs.org/).**

Tripetto Forms bring a new way of creating and deploying forms in websites and applications. You use its intuitive graphical [editor](https://www.npmjs.com/package/@tripetto/forms-editor) to build and edit smart forms with logic and conditional flows in 2D on a self-organizing drawing board. In any modern browser. Mouse, touch or pen.

And you deploy these smart forms in websites and applications using the supplementary [collector](https://www.npmjs.com/package/@tripetto/forms-collector) library. Anything you build in the editor, the collector will simply run. You just focus on the visuals of the embedded form.

*This demo shows how to implement the collector for some basic form input controls using [React](https://reactjs.org/). It has no fancy markup or styles. It shows the minimal required code to get a form up and running.*

# How to run
1. [Download](https://gitlab.com/tripetto/forms/examples/react/repository/master/archive.zip) or clone the [repository](https://gitlab.com/tripetto/forms/examples/react) to your local machine:
```bash
$ git clone git@gitlab.com:tripetto/forms/examples/react.git
```

2. Run `npm install` inside the downloaded/cloned folder:
```bash
$ npm install
```

3. Start the test server and open the URL `http://localhost:9000` in the browser of your choice to show the form:
```bash
$ npm test
```

4. Open another terminal/command prompt and start the editor (this will open an example definition file located at `./static/form.json`):
```bash
$ npm start
```

This will probably automatically open your default browser with the URL http://localhost:3333. If not, open the browser of your choice and navigate to this URL.

When you have changed your form, click the `Save` button at the right top of the editor. Then, refresh the form collector to run the altered form.

# Documentation
The complete Tripetto Forms documentation can be found at: [https://forms.tripetto.community](https://forms.tripetto.community).

The detailed collector documentation can be found [here](https://forms.tripetto.community/collector/).

# Issues
Run into issues using this demo code? Report them [here](https://gitlab.com/tripetto/forms/examples/react/issues).

Problems using the collector? Report bugs and issues [here](https://gitlab.com/tripetto/forms/collector/issues).

Problems using the editor? Report bugs and issues [here](https://gitlab.com/tripetto/forms/editor/issues).

# Support
For general support contact us at support@tripetto.com.

# About us
If you want to learn more about Tripetto or contribute in any way to our ambitions, visit us at [Tripetto.com](https://tripetto.com/).
