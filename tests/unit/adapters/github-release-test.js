import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:github-release', 'Unit | Adapter | github release', {
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let adapter = this.subject();
  assert.ok(adapter);
});

test('it builds the URL for the releases query correctly', function(assert) {
  let adapter = this.subject();
  const host = adapter.get('host');
  const repo = 'jimmay5469/old-hash';

  assert.equal(adapter.buildURL('github-release', null, null, 'query', { repo: repo }), `${host}/repos/${repo}/releases`);
});

test('it builds the URL for a specific release query correctly', function(assert) {
  let adapter = this.subject();
  const host = adapter.get('host');
  const repo = 'jimmay5469/old-hash';
  const release = 1;

  assert.equal(
    adapter.buildURL('github-release', null, null, 'queryRecord', { repo: repo, releaseId: release }),
    `${host}/repos/${repo}/releases/${release}`
  );
});
