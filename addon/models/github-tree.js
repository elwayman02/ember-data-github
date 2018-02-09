import DS from 'ember-data';

export default DS.Model.extend({
  sha: DS.attr('string'),
  url: DS.attr('string'),
  files: DS.attr(), // object
  directories: DS.attr(), // object
  blobs: DS.hasMany('github-blob'),
  trees: DS.hasMany('github-tree'),
  truncated: DS.attr('boolean')
});
