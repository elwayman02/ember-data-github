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

You need to choose how you wish to authenticate your GitHub requests using OAuth. `ember-data-github` provides a simple
and direct mechanism that is specific to itself. Alternatively, you can use a more general authentication framework like
`ember-simple-auth`.

### Authenticating Directly

If you already have a token to use the OAuth endpoints, such as a *Personal access token*, you must set the property
named `githubAccessToken` on `github-session` service with the currently logged in user's GitHub access token.

### Authenticating with `ember-simple-auth`

If you are using [ember-simple-auth](http://ember-simple-auth.com/) (ESA) to authenticate, perhaps with
[torii](http://vestorly.github.io/torii) and ESA's `torii-provider`, you can authenticate by creating a github
authorizer and extending `ember-data-github`'s adapter for each model you use. See the respective addon docs and
[GitHub's OAuth docs](https://developer.github.com/v3/oauth/) to set it up.


Once you have a token, the authorizer will look like
```js
// app/authorizers/github.js

import Ember from 'ember';
import Base from 'ember-simple-auth/authorizers/base';

export default Base.extend({
  session: Ember.inject.service(),
  authorize(sessionData, block) {
    if (this.get('session.isAuthenticated') && !Ember.isEmpty(sessionData.access_token)) {
      block('Authorization', `token ${sessionData.access_token}`);
    }
  }
});
```
assuming `access_token` is the name of the property containing the token. This automatically injects the `Authorization`
header into the API requests using ESA mechanisms.

An extended adapter for `github-user` would look like
```js
// app/adapters/github-user.js

import GitHubUserAdapter from 'ember-data-github/adapters/github-user';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default GitHubUserAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:github'
});
```

### Retrieving GitHub Data
The following examples show how to retrieve each supported GitHub entity as you might use it in your `model` hook.
```js
this.get('store').findRecord('github-user', '#'); // get the current user
this.get('store').findRecord('github-user', 'jimmay5469'); // get a user
this.get('store').findRecord('github-repository', 'jimmay5469/old-hash'); // get a repository
this.get('store').findRecord('github-branch', 'jimmay5469/old-hash/branches/master'); // get a branch
this.get('store').queryRecord('github-branch', { repo: 'jimmay5469/old-hash', branch: 'master' }); // get a specific branch
this.get('store').query('github-branch', { repo: 'jimmay5469/old-hash' }); // get a repo's branches
this.get('store').queryRecord('github-release', { repo: 'jimmay5469/old-hash', releaseId: 1 }); // get a specific release
this.get('store').query('github-release', { repo: 'jimmay5469/old-hash' }) // get a repo's releases
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

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
