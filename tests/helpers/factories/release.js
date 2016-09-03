let sampleDate = new Date().toISOString();

export default {
  defineRelease() {
    Factory.define('release')
      .sequence('id')
      .sequence('tag_name', function(i) {
        return `v1.0.${i}`;
      })
      .sequence('url', function(i) {
        return `https://api.github.com/repos/user1/repository1/releases/${i}`;
      })
      .sequence('html_url', function(i) {
        return `https://github.com/repos/user1/repository1/releases/$v1.0.${i}`;
      })
      .sequence('assets_url', function(i) {
        return `https://api.github.com/repos/user1/repository1/releases/${i}/assets`;
      })
      .sequence('upload_url', function(i) {
        return `https://uploads.github.com/repos/user1/repository1/releases/${i}/assets{?name,label}`;
      })
      .sequence('tarball_url', function(i) {
        return `https://api.github.com/repos/user1/repository1/tarball/v1.0.${i}`;
      })
      .sequence('zipball_url', function(i) {
        return `https://api.github.com/repos/user1/repository1/zipball/v1.0.${i}`;
      })
      .attr('target_commitish', 'master')
      .sequence('name', function(i) {
        return `release${i}`;
      })
      .attr('body', 'release body')
      .attr('draft', true)
      .attr('prerelease', true)
      .attr('created_at', sampleDate)
      .attr('published_at', sampleDate)
      .attr('author', { url: 'https://api.github.com/users/user1' })
  }
};
