import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:github-repository-contents', 'Unit | Adapter | github repository contents', {
  needs: ['service:github-session']
});

test('it builds the repo content URL correctly', function(assert) {
  let adapter = this.subject();
  const host = adapter.get('host');
  const repo = 'jmar910/test-repo-yay';
  const file = 'app.json';
  const query = {
    repo,
    file
  };

  assert.equal(adapter.buildURL('github-repository-contents', null, null, 'queryRecord', query), `${host}/repos/${repo}/contents/${file}`);
});
