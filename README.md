# Ember Data Github

[![Build Status](https://travis-ci.org/elwayman02/ember-data-github.svg?branch=master)](https://travis-ci.org/elwayman02/ember-data-github)
[![Ember Observer Score](http://emberobserver.com/badges/ember-data-github.svg)](http://emberobserver.com/addons/ember-data-github)
[![Code Climate](https://codeclimate.com/github/elwayman02/ember-data-github/badges/gpa.svg)](https://codeclimate.com/github/elwayman02/ember-data-github)

Ember Data abstraction for the [GitHub API](https://developer.github.com/v3/).

## Installation

```
ember install ember-data-github
```

## Usage

In order to use OAuth endpoints you must set the property named `githubAccessToken` on `github-session` service with the currently logged in user's GitHub access token.

Examples:
```
this.get('store').findRecord('githubUser', '#'); // get the current user
this.get('store').findRecord('githubUser', 'jimmay5469'); // get a user
this.get('store').findRecord('githubRepository', 'jimmay5469/old-hash'); // get a repository
this.get('store').findRecord('githubBranch, 'jimmay5469/old-hash/branches/master'); // get a branch
this.get('store').queryRecord('githubRelease', { repo: 'jimmay5469/old-hash', releaseId: 1 }) // get a specific release
this.get('store').query('githubRelease', { repo: 'jimmay5469/old-hash' }) // get a repo's releases
```

## Contributing

### Installation

* `git clone git@github.com:elwayman02/ember-data-github.git`
* `cd ember-data-github`
* `npm install`
* `bower install`

### Running

* `ember serve`
* Visit your app at http://localhost:4200.

### Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
