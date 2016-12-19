import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:github-branch', 'Unit | Adapter | github branch', {
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']
});

test('it exists', function (assert) {
  let adapter = this.subject();
  assert.ok(adapter);
});

test('it builds the specified branch URL correctly', function(assert) {
  let adapter = this.subject();
  const host = adapter.get('host');
  const branch = 'jimmay5469/old-hash/branches/master';

  assert.equal(adapter.buildURL('github-branch', branch, null, 'findRecord'), `${host}/repos/${branch}`);
});

// TODO: The index URL doesn't work correctly

test('it builds the branch index URL correctly as a query', function(assert) {
  let adapter = this.subject();
  const host = adapter.get('host');
  const repo = 'jimmay5469/old-hash';
  const query = {
    repo: repo,
  };

  assert.equal(adapter.buildURL('github-branch', null, null, 'query', query), `${host}/repos/${repo}/branches`);
});

test('it builds the specific branch URL correctly as a query', function(assert) {
  let adapter = this.subject();
  const host = adapter.get('host');
  const repo = 'jimmay5469/old-hash';
  const branch = 'master';
  const query = {
    repo: repo,
    branch: branch
  };

  assert.equal(adapter.buildURL('github-branch', null, null, 'queryRecord', query), `${host}/repos/${repo}/branches/${branch}`);
});
