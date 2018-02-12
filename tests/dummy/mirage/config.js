export default function testConfig() {
  this.urlPrefix = 'https://api.github.com/'

  this.get('/repos/:owner/:repo/branches/:branch', (schema, request) => {
    return schema.githubBranches.findBy({ name: request.params.branch });
  });

  this.get('/repos/:owner/:repo/branches', (schema, { params }) => {
    return schema.githubRepositories.findBy({ name: params.repo }).branches;
  });

  this.get('/repos/:owner/:repo/releases', (schema, request) => {
    return schema.githubRepositories.findBy({ name: request.params.branch }).releases;
  });

  this.get('/repos/:owner/:repo', (schema, request) => {
    return schema.githubRepositories.findBy({ name: request.params.repo });
  });

  this.get('repositories', (schema) => {
    return schema.githubRepositories.all();
  });

  this.get('repositories/:repo', (schema, request) => {
    return schema.githubRepositories.findBy({ id: request.params.repo });
  });

  this.get('user', (schema) => {
    return schema.githubUsers.first();
  });

  this.get('user/:id', (schema, request) => {
    return schema.githubUsers.findBy({ id: request.params.id })
  });

  this.get('user/repos', (schema) => {
    return schema.githubUsers.first().repositories;
  });

  this.get('users/:user/repos', (schema, { params }) => {
    return schema.githubUsers.findBy({ login: params.user }).repositories;
  });

  this.get('users/:user', (schema) => {
    return schema.githubUsers.first();
  });

  this.get('users', (schema) => {
    return schema.githubUsers.all().models;
  });

  this.get('/repos/:user/:repo/git/blobs/:blob', (schema, { params }) => {
    return schema.githubBlobs.findBy({ id: params.blob });
  });

  this.get('repos/:user/:repo/releases/:release', (schema, { params }) => {
    return schema.githubReleases.findBy({ id: params.release });
  });

  this.get('repos/:user/:repo/releases', (schema, { params }) => {
    return schema.githubRepositories.findBy({ name: params.repo }).releases;
  });

  this.get('repos/:user/:repo/pulls', (schema, { params }) => {
    return schema.githubRepositories.findBy({ name: params.repo }).pulls;
  });

  this.get('repos/:user/:repo/pulls/:pull', (schema, { params }) => {
    return schema.githubPulls.findBy({ id: params.pull });
  });

  this.get('repos/:user/:repo/git/trees/:tree', (schema, { params }) => {
    return schema.githubTrees.findBy({ id: params.tree });
  });

  this.get('/orgs/:org', (schema, { params }) => {
    return schema.githubOrganizations.findBy({ login: params.org });
  });

  this.get('orgs/:org/repos', (schema, { params }) => {
    return schema.githubOrganizations.findBy({ login: params.org }).repositories;
  });
}
