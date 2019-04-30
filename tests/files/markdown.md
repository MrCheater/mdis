## named-blocks.js#imports

[mdis]:# (./named-blocks.js#imports)
```
import React from 'react';
```

## named-blocks.js#render

[mdis]:# (./named-blocks.js#render)
```js
render() {
  return <div>Sample</div>;
}
```

## simple

[mdis]:# (./simple.js)
```js
class Point {
  ...
}
```

## RAW

[mdis]:# (./raw.js)
```js
class Raw {
  constructor() {
    this.raw = true
  }
}
```

## MyMap

[mdis]:# (./my-map.js)
```js
const store = new Map();

class MyMap {
  get (key) {
    return store.get(key);
  }
  set (key, value) {
    return store.set(key, value);
  }
}

export default MyMap
```

## MyMap.get

[mdis]:# (./my-map.js#get)
```js
get (key) {
  return store.get(key);
}
```

## MyMap.set

[mdis]:# (./my-map.js#set)
```js
set (key, value) {
  return store.set(key, value);
}
```

## Named blocks

[mdis]:# (./named-blocks.js)
```js
import React from 'react';

class NamedBlocks extends React.PureComponent {
  componentDidMount() {
    for(let i = 0; i < 10; i++) {
      for(let j = 0; j < 10; j++) {
        // some code
        console.log({ i, j })
      }
    }
    this.props.callback();
  }

  render() {
    return <div>Sample</div>;
  }
}
```

## Named blocks.imports

[mdis]:# (./named-blocks.js#imports)
```js
import React from 'react';
```

## Named blocks.Sample

[mdis]:# (./named-blocks.js#Sample)
```js
class NamedBlocks extends React.PureComponent {
  ...
}
```

## Named blocks.for-i-j

[mdis]:# (./named-blocks.js#for-i-j)
```js
for(let i = 0; i < 10; i++) {
  for(let j = 0; j < 10; j++) {
    // some code
    ...
  }
}
```

## Named blocks.render

[mdis]:# (./named-blocks.js#render)
```js
render() {
  return <div>Sample</div>;
}
```

## Named blocks Chaos

[mdis]:# (./named-blocks-chaos.js)
```js
import React from 'react';

class NamedBlocks extends React.PureComponent {
  componentDidMount() {
    for(let i = 0; i < 10; i++) {
      for(let j = 0; j < 10; j++) {
        // some code
        console.log({ i, j })
      }
    }
    this.props.callback();
  }

  render() {
    return <div>Sample</div>;
  }
}
```

## Named blocks.imports

[mdis]:# (./named-blocks-chaos.js#imports)
```js
import React from 'react';
```

## Named blocks.Sample

[mdis]:# (./named-blocks-chaos.js#Sample)
```js
class NamedBlocks extends React.PureComponent {
  ...
}
```

## Named blocks.for-i-j

[mdis]:# (./named-blocks-chaos.js#for-i-j)
```js
for(let i = 0; i < 10; i++) {
  for(let j = 0; j < 10; j++) {
    // some code
    ...
  }
}
```

## Named blocks.render

[mdis]:# (./named-blocks-chaos.js#render)
```js
render() {
  return <div>Sample</div>;
}
```

## Named blocks.NamedBlocks

[mdis]:# (./named-blocks-chaos.js#NamedBlocks)
```js
class NamedBlocks extends React.PureComponent {
  componentDidMount() {
    for(let i = 0; i < 10; i++) {
      for(let j = 0; j < 10; j++) {
        // some code
        console.log({ i, j })
      }
    }
    this.props.callback();
  }

  render() {
    return <div>Sample</div>;
  }
}
```

## Intersection
[mdis]:# (./intersection.js)
```js
export default [
  'banana',
  'sun',
  'lemon',
  'apple'
];
```

## Intersection.yellow
[mdis]:# (./intersection.js#yellow)
```js
'banana',
'sun',
'lemon',
```

## Intersection.round
[mdis]:# (./intersection.js#round)
```js
'sun',
'lemon',
'apple'
```

End.

