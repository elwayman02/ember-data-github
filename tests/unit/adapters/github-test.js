import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:github', 'Unit | Adapter | github', {
  needs: ['service:github-session']
});

test('it exists and has the right properties', function (assert) {
  let adapter = this.subject();
  assert.ok(adapter);
  assert.ok(adapter.get('host'));
  assert.ok(adapter.get('session'));
  assert.ok(adapter.get('headers'));
});

test('it computes headers without authorization correctly', function(assert) {
  let adapter = this.subject();
  let session = adapter.get('session');

  assert.ok(session);
  assert.notOk(session.get('githubAccessToken'));
  assert.deepEqual(adapter.get('headers'), {});
});

test('it computes headers with authorization correctly', function(assert) {
  let adapter = this.subject();
  let session = adapter.get('session');
  const token = 'asdfjkl';

  session.set('githubAccessToken', token);

  assert.deepEqual(adapter.get('headers'), { Authorization: `token ${token}`});
});

test('it transforms type names correctly', function(assert) {
  let adapter = this.subject();

  assert.equal(adapter.pathForType('github-user'), 'users');
  assert.equal(adapter.pathForType('github-user-name'), 'userNames');
});

test('it extracts links from the Link header', function(assert) {
  let adapter = this.subject();
  let first = '<https://api.github.com/resouce?page=1&per_page=5>; rel="first"';
  let next = '<https://api.github.com/resouce?page=3&per_page=5>; rel="next"';
  let prev = '<https://api.github.com/resouce?page=1&per_page=5>; rel="prev"';
  let last = '<https://api.github.com/resouce?page=4&per_page=5>; rel="last"';

  let headers = {
    link: [first, next, prev, last].join(', ')
  };

  assert.deepEqual(adapter.handleResponse(200, headers, {}, null).links, {
    first: 'https://api.github.com/resouce?page=1&per_page=5',
    next: 'https://api.github.com/resouce?page=3&per_page=5',
    prev: 'https://api.github.com/resouce?page=1&per_page=5',
    last: 'https://api.github.com/resouce?page=4&per_page=5'
  });
});

test('it handles a missing Link header', function(assert) {
  let adapter = this.subject();
  let headers = {};

  assert.equal(adapter.handleResponse(200, headers, {}, null).links, undefined);
});

test('it handles a mis-formed Link header', function(assert) {
  let adapter = this.subject();
  let headers = {
    Link: 'well_this-is|unexpected'
  }

  assert.equal(adapter.handleResponse(200, headers, {}, null).links, undefined);
});
