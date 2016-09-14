import Ember from 'ember';

export default Ember.Test.registerHelper(
  'assertGithubReleaseOk',
  function (app, assert, release) {
    assert.ok(release.get('id'), 'id');
    assert.ok(release.get('url'), 'url');
    assert.ok(release.get('htmlUrl'), 'htmlUrl');
    assert.ok(release.get('assetsUrl'), 'assetsUrl');
    assert.ok(release.get('uploadUrl'), 'uploadUrl');
    assert.ok(release.get('tarballUrl'), 'tarballUrl');
    assert.ok(release.get('zipballUrl'), 'zipballUrl');
    assert.ok(release.get('tagName'), 'tagName');
    assert.ok(release.get('targetCommitish'), 'targetCommitish');
    assert.ok(release.get('name'), 'name');
    assert.ok(release.get('body'), 'body');
    assert.ok(release.get('draft'), 'draft');
    assert.ok(release.get('prerelease'), 'prerelease');
    assert.ok(release.get('createdAt'), 'createdAt');
    assert.ok(release.get('publishedAt'), 'publishedAt');
  }
);
