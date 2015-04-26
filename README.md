# ember-data-github [![Build Status](https://travis-ci.org/jimmay5469/ember-data-github.svg)](https://travis-ci.org/jimmay5469/ember-data-github)

Ember Data library for the [GitHub API](https://developer.github.com/v3/).

## Using ember-data-github

```
ember install ember-data-github
```

To use OAuth endpoints you must also make sure you have a session service which contains a property named `githubToken`.

To see what is currently supported check out the `addon/models/` directory.  Currently this addon does not support write actions.

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
