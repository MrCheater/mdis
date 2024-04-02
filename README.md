# mdis

**M**ark**D**own **I**nclude **S**ource

Library for including code in Markdown file - A software developed for the JavaScript and TypeScript environments, enabling users to easily integrate and showcase code samples in their Markdown-powered documents.

## Key Features:
* Embed code snippets with syntax highlighting
* Support multiple programming languages, including JavaScript and TypeScript
* Lightweight and optimized for fast performance
* Easy to integrate and customize
* User-friendly and fully accessible

## Usage:
```sh
npm install mdis --save-dev
```
<table>
<tr>
<th>Markdown</th>
<th>package.json</th>
</tr>
<tr>
<td>
<pre>
[mdis]:# (./my-lib.ts)
```ts
```
</pre>
</td>
<td>
<pre>
{
  "name": "package-name",
  "scripts": {
    "mdis": "mdis"
  },
  "devDependencies": {
    "mdis": "*"
  }
}
</pre>
</td>
</tr>
</table>

## Features

#### Simple blocks
<table>
<tr>
<th>Markdown</th>
<th>Source code</th>
</tr>
<tr>
<td>
<pre>
[mdis]:# (./simple.js)
```js title="Simple"
class Point {
  ...
}
```
</pre>
</td>
<td>
<pre>
// mdis-start
class Point {
// mdis-stop
  constructor(x, y) {
    this.x = x
    this.y = y
  }
// mdis-start
}
// mdis-stop

export default Point
</pre>
</td>
</tr>
</table>

#### Named blocks
<table>
<tr>
<th>Markdown</th>
<th>Source code</th>
</tr>
<tr>
<td>
<pre>
[mdis]:# (./named-blocks.js#imports)
```
import React from 'react';
```
</pre>
<pre>
[mdis]:# (./named-blocks.js#render)
```
render() {
  return &lt;div&gt;Sample&lt;/div&gt;;
}
```
</pre>
</td>
<td>
<pre>
// mdis-start imports
import React from 'react';
// mdis-stop imports

class NamedBlocks extends React.PureComponent {
&#160;&#160;// mdis-start render
&#160;&#160;render() {
&#160;&#160;&#160;&#160;return &lt;div&gt;Sample&lt;/div&gt;;
&#160;&#160;}
&#160;&#160;// mdis-stop render
}
</pre>
</td>
</tr>
</table>


#### Named blocks
<table>
<tr>
<th>Markdown</th>
<th>Source code</th>
</tr>
<tr>
<td>
<pre>
[mdis]:# (./intersection.js#yellow)
```js
'banana',
'sun',
'lemon',
```
</pre>
<pre>
[mdis]:# (./intersection.js#round)
```js
'sun',
'lemon',
'apple'
```
</pre>
</td>
<td>
<pre>
export default [
  // mdis-start yellow
  'banana',
  // mdis-start round
  'sun',
  'lemon',
  // mdis-stop yellow
  'apple'
  // mdis-stop round
];
</pre>
</td>
</tr>
</table>

#### Raw
<table>
<tr>
<th>Markdown</th>
<th>Source code</th>
</tr>
<tr>
<td>
<pre>
[mdis]:# (./config.yaml)
```yaml
docker:
  - image: ubuntu:14.04
  - image: mongo:2.6.8
    command: [mongod, --smallfiles]
  - image: postgres:9.4.1
```
</pre>
</td>
<td>
<pre>
docker:
  - image: ubuntu:14.04
  - image: mongo:2.6.8
    command: [mongod, --smallfiles]
  - image: postgres:9.4.1
</pre>
</td>
</tr>
</table>
