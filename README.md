# Ember Data Github

[![Build Status](https://travis-ci.org/elwayman02/ember-data-github.svg?branch=master)](https://travis-ci.org/elwayman02/ember-data-github)
[![Ember Observer Score](http://emberobserver.com/badges/ember-data-github.svg)](http://emberobserver.com/addons/ember-data-github)
[![Code Climate](https://codeclimate.com/github/elwayman02/ember-data-github/badges/gpa.svg)](https://codeclimate.com/github/elwayman02/ember-data-github)

Ember Data abstraction for the [GitHub REST API v3](https://developer.github.com/v3/).

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

import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';
import Base from 'ember-simple-auth/authorizers/base';

export default Base.extend({
  session: service(),
  authorize(sessionData, block) {
    if (this.get('session.isAuthenticated') && !isEmpty(sessionData.access_token)) {
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

#### [Users](https://developer.github.com/v3/users/)

##### [Get the current authenticated user](https://developer.github.com/v3/users/#get-the-authenticated-user)
```js
this.get('store').findRecord('github-user', '#');
```

##### [Get a single user](https://developer.github.com/v3/users/#get-a-single-user)
```js
this.get('store').findRecord('github-user', 'jimmay5469'); // get a user by user login
this.get('store').findRecord('github-user', 917672); // get a user by user id
```

#### [Repositories](https://developer.github.com/v3/repos/)

##### [Get](https://developer.github.com/v3/repos/#get)
```js
this.get('store').findRecord('github-repository', 'jimmay5469/old-hash'); // get a repository by repository name
this.get('store').findRecord('github-repository', 34598603); // get a repository by repository id
```

##### [Branches](https://developer.github.com/v3/repos/branches/)

###### [List branches](https://developer.github.com/v3/repos/branches/#list-branches)

```js
this.get('store').query('github-branch', { repo: 'jimmay5469/old-hash' });
```

###### [Get](https://developer.github.com/v3/repos/branches/#get-branch)
```js
this.get('store').findRecord('github-branch', 'jimmay5469/old-hash/branches/master'); // get a branch
this.get('store').queryRecord('github-branch', { repo: 'jimmay5469/old-hash', branch: 'master' }); // get a specific branch
```

##### [Releases](https://developer.github.com/v3/repos/releases/)

###### [List releases for a repository](https://developer.github.com/v3/repos/releases/#list-releases-for-a-repository)
```js
this.get('store').query('github-release', { repo: 'jimmay5469/old-hash' });
```

###### [Get a single release](https://developer.github.com/v3/repos/releases/#get-a-single-release)
```js
this.get('store').queryRecord('github-release', { repo: 'jimmay5469/old-hash', releaseId: 1 });
```

##### [Commits](https://developer.github.com/v3/repos/commits/)

###### [Compate two commits](https://developer.github.com/v3/repos/commits/#compare-two-commits)

```js
this.get('store').queryRecord('github-compare', { repo: 'jimmay5469/old-hash', base: '1234', head: '5678' });
```

#### [Pull Requests](https://developer.github.com/v3/pulls/)

##### [List pull requests](https://developer.github.com/v3/pulls/#list-pull-requests)
```js
this.get('store').query('github-pull', { repo: 'jimmay5469/old-hash' });
```

##### [Get a single pull request](https://developer.github.com/v3/pulls/#get-a-single-pull-request)
```js
this.get('store').queryRecord('github-pull', { repo: 'jimmay5469/old-hash', pullId: 1 });
```
#### [GitHub Organizations](https://developer.github.com/v3/orgs/)

##### [Get an organizaton](https://developer.github.com/v3/orgs/#get-an-organization)
```js
this.get('store').findRecord('github-organization', { org: 'my-org' });
```

##### [Get organization members](https://developer.github.com/v3/orgs/members/#members-list)
```js
this.get('store').query('github-members', { org: 'my-org' })
```

#### [Git Blobs](https://developer.github.com/v3/git/blobs/)

##### [Get a blob](https://developer.github.com/v3/git/blobs/#get-a-blob)

```js
this.get('store').queryRecord('github-blob', { repo: 'jimmay5469/old-hash', sha: '47c5438403ca875f170db2aa07d1bfa3689406e3' });
```
#### [Git Trees](https://developer.github.com/v3/git/trees/)

##### [Get a Tree](https://developer.github.com/v3/git/trees/#get-a-tree)

```js
this.get('store').queryRecord('github-tree', { repo: 'jimmay5469/old-hash', sha: '47c5438403ca875f170db2aa07d1bfa3689406e3' });
```

## Contributing

### Installation

* `git clone git@github.com:elwayman02/ember-data-github.git`
* `cd ember-data-github`
* `yarn`

### Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
