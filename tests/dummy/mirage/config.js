export default function() {
  this.urlPrefix = 'https://api.github.com/'

  this.get('/repos/:owner/:repo/branches/:branch', ({ db: { githubBranches } }) => {
    return githubBranches[0];
  });

  this.get('/repos/:owner/:repo/branches', ({ db: { githubBranches, githubRepositories } }, { params }) => {
    let repo = githubRepositories.where({ name: params.repo })[0];
    return githubBranches.map((branch) => {
      if (branch.repositoryId === repo.id) {
        return branch;
      }
    });
  });

  this.get('/repos/:owner/:repo/releases', ({ db: { githubReleases, githubRepositories } }, { params }) => {
    let repo = githubRepositories.where({ name: params.repo })[0];
    return githubReleases.map((release) => {
      if (release.repositoryId === repo.id) {
        return release;
      }
    });
  });

  this.get('/repos/:owner/:repo', ({ db: { githubRepositories } }, { params }) => {
    let repo = githubRepositories.where({ name: params.repo })[0];
    repo.owner = server.db.githubUsers[0];
    return repo;
  });

  this.get('repositories', ({ db: { githubRepositories } }) => {
    githubRepositories.forEach((repo) => {
      repo.owner = server.db.githubUsers[0];
      return repo;
    });
    return githubRepositories;
  });

  this.get('user', ({ db: { githubUsers } }) => {
    return githubUsers[0];
  });

  this.get('user/repos', ({ db: { githubUsers, githubRepositories } }) => {
    let user = githubUsers[0]
    let repos = githubRepositories.where({ ownerId: user.id });
    repos.forEach((repo) => {
      repo.owner = user;
      return repo;
    });
    return repos;
  });

  this.get('users/:user', ({ db: { githubUsers } }) => {
    return githubUsers[0];
  });

  this.get('/repos/:user/:repo/git/blobs/:blob', ({ db: { githubBlobs } }, { params }) => {
    return githubBlobs.where({ id: params.blob })[0];
  });
}
