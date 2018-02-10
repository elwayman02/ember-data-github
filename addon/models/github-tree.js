import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  sha: attr('string'),
  url: attr('string'),
  files: attr(), // object
  directories: attr(), // object
  truncated: attr('boolean'),

  blobs: hasMany('github-blob'),
  trees: hasMany('github-tree')
});
