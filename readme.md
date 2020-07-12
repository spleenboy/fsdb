# fsdb

I wanted a database-like javascript tool that game me more control over how the data gets stored and formatted. This library offers a file-based database with modular support for both the file format and storage mechanism.

## UNDER CONSTRUCTION

This tool is by no means production ready. I'm just throwing it into a public repo to hold myself accountable about its development.

## Proposed Syntax

```
import fsdb from "@spleenboy/fsdb";
import { ToDo, Note } from "examples/types";


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

const todo = await fsdb.get<ToDo>('todos/all');

```
