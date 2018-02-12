import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:github-member', 'Unit | Adapter | github member', {
  needs: ['service:github-session']
});

test('it builds the organization\'s members URL correctly', function(assert) {
  let adapter = this.subject();
  const host = adapter.get('host');
  const org = 'ember';
  const query = {
    org,
  };

  assert.equal(adapter.buildURL('github-member', null, null, 'query', query), `${host}/orgs/${org}/members`);
});
