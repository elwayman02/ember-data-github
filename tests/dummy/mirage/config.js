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

  this.get('users/:user/repos', ({ db: { githubUsers, githubRepositories } }) => {
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

  this.get('users', ({ db : { githubUsers } }) => {
    return githubUsers;
  });

  this.get('/repos/:user/:repo/git/blobs/:blob', ({ db: { githubBlobs } }, { params }) => {
    return githubBlobs.where({ id: params.blob })[0];
  });

  this.get('repos/:user/:repo/releases/:release', ({ db: { githubReleases, githubUsers } }, { params }) => {
    let release = githubReleases.where({ id: params.release })[0];
    release.author = githubUsers[0];
    return release;
  });

  this.get('repos/:user/:repo/releases', ({ db: { githubReleases, githubUsers } }) => {
    let releases = githubReleases;
    releases.forEach((repo) => {
      repo.author = githubUsers[0];
      return repo;
    });
    return releases;
  });

  this.get('repos/:user/:repo/git/trees/:tree', ({ db: { githubTrees }}, { params }) => {
    return githubTrees.where({ id: params.tree })[0];
  });

  this.get('/orgs/:org', ({ db: { githubOrganizations } }, { params }) => {
    return githubOrganizations.where({ login: params.org })[0];
  });

  this.get('orgs/:org/repos', ({ db: { githubOrganizations, githubRepositories } }) => {
    let org = githubOrganizations[0]
    let repos = githubRepositories.where({ ownerId: org.id });
    repos.forEach((repo) => {
      repo.owner = org;
      return repo;
    });
    return repos;
  });
}
