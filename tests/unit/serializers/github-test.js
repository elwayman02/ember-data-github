import { moduleFor, test } from 'ember-qunit';

moduleFor('serializer:github', 'Unit | Serializer | github', {
  // Specify the other units that are required for this test.
  needs: []
});

test('extracts pagination metadata from payload.links', function (assert) {
  let serializer = this.subject();
  let modelClass = { modelName: 'my-model' };

  let payload = {
    'my-models': [ { id: 1 }, { id: 2 } ]
  };

  payload['my-models'].links = {
    first: 'https://api.github.com/resouce?page=1&per_page=5',
    next: 'https://api.github.com/resouce?page=3&per_page=5',
    prev: 'https://api.github.com/resouce?page=1&per_page=5',
    last: 'https://api.github.com/resouce?page=4&per_page=5'
  };

  assert.deepEqual(serializer.extractMeta(null, modelClass, payload), {
    first: { page: 1, per_page: 5 },
    next: { page: 3, per_page: 5 },
    prev: { page: 1, per_page: 5 },
    last: { page: 4, per_page: 5 }
  });
});

test('it handles a missing payload.links property', function (assert) {
  let serializer = this.subject();
  let modelClass = { modelName: 'my-model' };

  let payload = {
    'my-models': [ { id: 1 }, { id: 2 } ]
  };

  assert.equal(serializer.extractMeta(null, modelClass, payload), undefined);
});
