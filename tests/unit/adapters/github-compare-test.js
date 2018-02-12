import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:github-compare', 'Unit | Adapter | github compare', {
  needs: ['service:github-session']
});

test('it builds the URL for a specific comparison query correctly', function(assert) {
  let adapter = this.subject();
  const host = adapter.get('host');
  const repo = 'jimmay5469/old-hash';
  const base = 1234
  const head = 5678;

  assert.equal(
    adapter.buildURL('github-compare', null, null, 'queryRecord', { repo, base, head }),
    `${host}/repos/${repo}/compare/${base}...${head}`
  );
});
