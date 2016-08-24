'use strict';

import jsdom from 'jsdom';

// Define some basic html
const DEFAULT_HTML = '<html><body></body></html>';

// use JSDOM's fake DOM as the document
global.document = jsdom.jsdom(DEFAULT_HTML);

// Set up a mock window
global.window = document.defaultView;

// Allow for things like window.location
global.navigator = window.navigator;