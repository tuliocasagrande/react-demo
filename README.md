# React Demo

Sample app built using react, ES2015 features, gulp and json-server.

Made by following the following screencast series:
1. https://www.codeschool.com/screencasts/add-a-build-system-to-a-react-application
2. https://www.codeschool.com/screencasts/es2015-and-the-virtual-dom-in-a-react-application
3. https://www.codeschool.com/screencasts/add-a-router-to-a-react-application

# Installing

1. Clone the repo
2. `npm install -g gulp` to install Gulp globally
3. `npm install -g json-server` for the API
4. `npm install` to resolve project dependencies

# Running

First, run the API with `json-server server/db.json`

Then open another terminal and run `npm start`, which will open the browser with the application running.

The project is currently setup to transpile code under the `/src` folder using the `/src/app.js` file as an entry point. The resulting code ends up in the `public` directory.
