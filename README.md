# mdis: MarkDown Include Source lib for JS

_mdis_ provides tools for adding code snippets to your Mardkown-based documentation files, and is available for both inside and public use; it enables embedding copyable code snippets with syntax highlight support for multiple programming languages, including vanilla JavaScript and TypeScript into Markdown files.

### Features:
✅ **Supports** vanilla JavaScript, TypeScript, React, Node.js  
🔧 **Friendly** in installation and use  
⚡ **Lightweight and fast**

🌱 **Partially supports** languages other than above: those are only importable _from whole files_ and _will not have syntax highlight_

  
## Installation
You will need to import _mdis_ separately for each of your projects. We suggest importing it as a development stage component:
```sh
npm install mdis --save-dev
```

## Options and their output
> ⚠ We recommend reading the below section with this repo file tree open in a separate tab: that way you will better see the _MD doc input_ ⇒ _MD doc + mdis result_ logic.

#### 1. Simple block

##### ✍ Input
`````markdown
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
`````
⇓
##### 🤖 Result
`````markdown
[mdis]:# (./tests/files/simple.js)
```js title="Simple"
class Point {
  ...
}
```
`````

#### 2. Named block

##### ✍ Input
`````markdown
// mdis-start imports
import React from 'react';
// mdis-stop imports

class NamedBlocks extends React.PureComponent {
  // mdis-start render
  render() {
    return <div>Sample</div>;
  }
  // mdis-stop render
}
`````
⇓
##### 🤖 Result
`````markdown
[mdis]:# (./tests/files/named-blocks.js#imports)
```js
import React from 'react';
```

[mdis]:# (./tests/named-blocks.js#render)
```js
render() {
  return <div>Sample</div>;
}
```
`````

#### 3. Intersection

##### ✍ Input
`````markdown
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
`````
⇓
##### 🤖 Result
`````markdown
[mdis]:# (./tests/files/intersection.js#round)
```js
'sun',
'lemon',
'apple'
```

[mdis]:# (./tests/files/intersection.js#yellow)
```js
'banana',
'sun',
'lemon',
```
`````

#### 4. Raw

##### ✍ Input
`````markdown
docker:
  - image: ubuntu:14.04
  - image: mongo:2.6.8
    command: [mongod, --smallfiles]
  - image: postgres:9.4.1
`````
⇓
##### 🤖 Result
`````markdown
[mdis]:# (./tests/files/config.yaml)
```yaml
docker:
  - image: ubuntu:14.04
  - image: mongo:2.6.8
    command: [mongod, --smallfiles]
  - image: postgres:9.4.1
```
`````

<!-- -=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-

❌ 1. Simple block

<table>
<tr>
<th><em>mdis</em> input</th>
<th>Result</th>
</tr>
<tr>
<td>
<pre>
<code markdown>
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
</code>
</pre>
</td>
<td>
<pre>
[mdis]:# (./tests/files/simple.js)
```js title="Simple"class Point {
  ...
}```
</pre>
</td>
</tr>
</table>

❌ 2. Named block
<table>
<tr>
<th><em>mdis</em> input</th>
<th>Result</th>
</tr>
<tr>
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
<td>
<pre>
[mdis]:# (./tests/files/named-blocks.js#imports)
```
import React from 'react';
```
</pre>
<pre>
[mdis]:# (./tests/named-blocks.js#render)
```
render() {
  return &lt;div&gt;Sample&lt;/div&gt;;
}
```
</pre>
</td>
</tr>
</table>

❌ 3. Intersection
<table>
<tr>
<th><em>mdis</em> input</th>
<th>Result</th>
</tr>
<tr>
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
<td>
<pre>
[mdis]:# (./tests/files/intersection.js#round)
```js
'sun',
'lemon',
'apple'
```
</pre>
<pre>
[mdis]:# (./tests/files/intersection.js#yellow)
```js
'banana',
'sun',
'lemon',
```
</pre>
</td>
</tr>
</table>

❌ 4. Raw
<table>
<tr>
<th><em>mdis</em> input</th>
<th>Result</th>
</tr>
<tr>
<td>
<pre>
docker:
  - image: ubuntu:14.04
  - image: mongo:2.6.8
    command: [mongod, --smallfiles]
  - image: postgres:9.4.1
</pre>
</td>
<td>
<pre>
[mdis]:# (./tests/files/config.yaml)
```yaml
docker:
  - image: ubuntu:14.04
  - image: mongo:2.6.8
    command: [mongod, --smallfiles]
  - image: postgres:9.4.1
```
</pre>
</td>
</tr>
</table>
-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-
-->
