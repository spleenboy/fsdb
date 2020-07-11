# fsdb

I wanted a database-like javascript tool that game me more control over how the data gets stored and formatted. This library offers a file-based database with modular support for both the file format and storage mechanism.

## Syntax

```
import fsdb from '@spleenboy/fsdb';

const todos = fsdb.collection('todo');


// Initialize
fsdb.init({
    storage: {
        type: 'local',
        settings: {
            style: 'tree',
        },
    },
    format: {
        type: 'yaml',
    }
});

// Getting a document
const doc = fsdb.get(id);

// Finding many docs
const docs = fsdb.query()
  .and('title', /^Software .+$/g)
  .andNone('body.keywords', 'blog post')
  .limit(10)
  .offset(1)
  .get();

// Updating

```
