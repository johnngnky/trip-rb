![Tripetto](https://forms.tripetto.community/images/punchline.svg)

Tripetto Forms is a full-fledged form kit. Its graphical [**editor**](https://www.npmjs.com/package/@tripetto/forms-editor) covers powerful form creation – either stand-alone or as a brandable embedded solution. The supplementary [**collector**](https://www.npmjs.com/package/@tripetto/forms-collector) library handles form execution and response collection in any website or application. The UI is truly yours to rock. Also, you can extend both editor and collector with custom [**building blocks**](https://forms.tripetto.community/providers/) (e.g. question types).

# React example

[![pipeline status](https://gitlab.com/tripetto/forms/examples/react/badges/master/pipeline.svg)](https://gitlab.com/tripetto/forms/examples/react/commits/master)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![docs](https://img.shields.io/badge/docs-website-blue.svg)](https://forms.tripetto.community/collector)
[![Join the community on Spectrum](https://withspectrum.github.io/badge/badge.svg)](https://spectrum.chat/tripetto)

This demo shows how to implement the collector for some basic form input controls using [React](https://reactjs.org/) and [Bootstrap](http://getbootstrap.com/). The goal is to show you how to implement the collector with minimal code footprint so you get a good understanding of the principles.

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

This last command will probably automatically open your default browser with the URL http://localhost:3333. If not, open the browser of your choice and navigate to this URL.

When you have changed your form, click the `Save` button at the right top of the editor. Then, refresh the form collector to run the altered form.

# Documentation
The complete Tripetto Forms documentation can be found at: [https://forms.tripetto.community](https://forms.tripetto.community).

# Support
Run into issues or bugs? Report them [here](https://gitlab.com/tripetto/forms/examples/react/issues) and we'll look into them.

For general support contact us at [support@tripetto.com](mailto:support@tripetto.com). We're more than happy to help you.

# License
Have a blast. MIT.

# About us
If you want to learn more about Tripetto or contribute in any way to our ambitions, visit us at [Tripetto.com](https://tripetto.com/).
