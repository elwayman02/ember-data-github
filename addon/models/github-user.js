import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  login: attr('string'),
  name: attr('string'),
  type: attr('string'),
  avatarUrl: attr('string'),
  htmlUrl: attr('string'),
  publicRepos: attr('number'),
  publicGists: attr('number'),
  followers: attr('number'),
  following: attr('number'),
  createdAt: attr('date'),
  updatedAt: attr('date'),
  url: attr('string'),
  company: attr('string'),
  blog: attr('string'),
  location: attr('string'),
  email: attr('string'),
  bio: attr('string'),

  repositories: hasMany('githubRepository')
});
