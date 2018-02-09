import { run } from '@ember/runloop';
import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

let container, store;

moduleForAcceptance('Acceptance | github organization', {
  beforeEach() {
    container = this.application.__container__;
    store = run(container, 'lookup', 'service:store');
  }
});

test('finding an organization without authorization', function (assert) {
  assert.expect(4);

  server.create('github-organization');

  return run(() => {
    return store.findRecord('githubOrganization', 'organization0').then((organization) => {
      assert.githubOrganizationOk(organization);
      assert.equal(store.peekAll('githubOrganization').get('length'), 1);
      assert.equal(server.pretender.handledRequests.length, 1);
      assert.equal(server.pretender.handledRequests[0].requestHeaders.Authorization, undefined);
    });
  });
});

test('finding an organization', function (assert) {
  assert.expect(4);

  server.create('github-organization');
  container.lookup('service:github-session').set('githubAccessToken', 'abc123');

  return run(() => {
    return store.findRecord('githubOrganization', 'organization0').then((organization) => {
      assert.githubOrganizationOk(organization);
      assert.equal(store.peekAll('githubOrganization').get('length'), 1);
      assert.equal(server.pretender.handledRequests.length, 1);
      assert.equal(server.pretender.handledRequests[0].requestHeaders.Authorization, 'token abc123');
    });
  });
});

test(`finding an organization's repositories`, function (assert) {
  assert.expect(4);
  server.create('github-organization', 'withRepositories');
  container.lookup('service:github-session').set('githubAccessToken', 'abc123');

  return run(() => {
    return store.findRecord('githubOrganization', 'organization0').then((organization) => {
      return organization.get('repositories').then(function (repositories) {
        assert.equal(repositories.get('length'), 2);
        assert.githubRepositoryOk(repositories.toArray()[0]);
        assert.equal(server.pretender.handledRequests.length, 2);
        assert.equal(server.pretender.handledRequests[1].requestHeaders.Authorization, 'token abc123');
      });
    });
  });
});
