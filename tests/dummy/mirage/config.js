export default function() {
  this.urlPrefix = 'https://api.github.com/'

  this.get('/repos/:owner/:repo/branches/:branch', ({ db: { githubBranches } }) => {
    return githubBranches[0];
  });
}
