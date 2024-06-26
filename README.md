# _mdis_: MD Source code inclusion tuner [JS, TS, etc.]

_mdis_ — **M**ark**D**own **I**nclude **S**ource — provides means for precisely tuning the appearance of the JS, TS, etc. code snippets for further reference in your Mardkown-based documentation files, available for both inside and public use; with _mdis_ you will be able to embed code snippets with **specified displayed/hidden sections** and syntax highlighting support for multiple programming languages, including vanilla JavaScript and TypeScript — all in your Markdown files.

> ✅ **Supports** vanilla JavaScript, TypeScript, React, Node.js  
> 🔧 **Friendly** in installation and use  
> ⚡ **Lightweight and fast**
> 
> ⚙️ **Code in unsupported languages** importable _as whole file's contents_, with legitimate syntax highliting (as long as your Markdown processor supports it for the given language).

## _mdis_ operation and use
### 0. Installation ⏬
> You will need to import _mdis_ separately for each of your projects. We suggest installing it as a development stage dependency:
> ```powershell
> npm install mdis --save-dev
> ```
>  
> **Now, by using `mdis-` comments _within your code_, you will be able to control some aspects of how it will be _rendered when referenced in Markdown_:**

### 1. Basic visibility control with _mdis-start/mdis-stop_ comments 👁️
Where you want to change the visibility of sections of code when embedded in the project's .MD files, use:  
* `mdis-start` to mark the start of the visible section, and  
* `mdis-stop` to mark the end of such section.
  
### 2. Chaining of visibility declarations 🚃
Using several  `mdis-start`/`mdis-stop` comments in the same code file will lead to sections enclosed in such comments appearing in the .MD file, and the rest of the code being omitted, with `...` in its place _(see  [Nameless sections](#nameless-sections))_. You may not interpolate unappended `mdis-start`/`mdis-stop` sections with one another in any way; only sequential use is allowed for them.
  
### 3. Creating named code sections; interpolating of sections 🏷️
You can append your start/stop declarations with an arbitrary section name.  
1. You must include the section name for **both starting and ending comment** of the respective section.  
2. 🖇️ Named sections may follow one another _(see [Named sections](#named-sections))_, be nested, or overlap with one another _(see [Overlapping sections](#overlapping-sections))_.  
3. The section names may only include **alphabetical characters in either case, numerals, dashes, and underscores** (`A..Z, a..z, 0..9, -, _`).
4. Portions of code with named `mdis-` sections will appear in the .MD files under an *extended URL*: `[mdis]:# (./path/file.js_#section-name)` — as opposed to nameless `mdis-`-tuned portions of code: `[mdis]:# (./path/file.js)`.
5. Portions of code with named `mdis-` sections will have a *code snippet name* set as `title="section-name"`, with the exact same spelling and capitalization as given in the respective `mdis-` comments.

### 4. Using _mdis_ with unsupported languages ⚙️
If you use _mdis_ with code in an unsupported language, you will only be able to embed the respective files' contents as a whole, with no visibility restrictions in force, regardless of whether you made the `mdis-` comments in them or not _(see [Raw import](#raw-import))_.

### 5. _Actually_ referencing _mdis_-tuned code in .MD files 🔗
To reference `mdis-`-tuned code in your .MD files through _mdis_ import,
<!-- ❗💬 STEPS BELOW ARE MY SPECULATIONS ON HOW THIS SHOULD BE DONE; I SUPPOSE ONE WON'T WANT CODE IMPORTS INLINE, HENCE ADDING THESE "ADD NEW LINE" STEPS; ALSO, I'M ABSOLUTELY CONFUSED AS TO _HOW TO ACTUALLY RUN THE UTILITY ❗💬 -->
   1. Start at a new line;
   2. Preface the MD link to the code file with `[mdis]`; then, write down the code file link like you normally would;
   3. Add a new line;
   4. Run _mdis_; <!-- ❗💬 HOW DOES ONE DO IT ❗💬 -->
   5. After the utility is done working, your
      ```[mdis](./path/file.ext)```
      will turn into:
      `````markdown
      [mdis]#: (./path/file.ext)
      ```lang
      code {
        ...
      }
      ```
      `````
      — with the code being added automatically based on the visibility flow set for the corresponding code file with the `mdis-` comments.
  
### 6. Specifics of code snippets render 📏
_mdis_-processed code snippets are dependent on the respective code files: code snippets' contents **will change** if you make **changes to the referenced portions of code**, — and will *always reflect reference sources' state* upon restart, even if you try to make amendments in the rendered code snippets within the .MD file.
  
### 7. Export from .MD files using _mdis_-tuned code snippets ⏫
Upon export through Markdown-to-RTF/PDF/XML/etc. processors, the .MD files including `mdis-`-tuned portions of code **will have such snippets displayed exactly as written (and tuned) in their source files**, regardless of any amendments you might make over reference copies of them in the .MD files.

Now, below are examples of how `mdis-`-tuned JS code appears when referenced in an .MD file, as well as how non-supported language code gets imported when processed with _mdis_.

## Examples of output from various use scenarios
> ⚠ We recommend reading the below section with this repo file tree open by the side: that way you will better understand the _**source code file** + `mdis-` comments_ ⇒ _**.MD file** + _mdis lib_ processing_ logic.

### Nameless sections

**📜 .JS file with `mdis-` comments**
`````js
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
> In an .MD file, `[mdis](./tests/files/simple.js)` will turn into:
 
**🤖 .MD file after _mdis_ lib processing**
`````markdown
[mdis]:# (./tests/files/simple.js)
```js
class Point {
  ...
}
```
`````
  
### Named sections

**📜 .JS file with `mdis-` comments**
`````js
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
> In an .MD file, `[mdis](./tests/files/named-blocks.js)` will turn into:
  
**🤖 .MD file after _mdis_ lib processing**
`````markdown
[mdis]:# (./tests/files/named-blocks.js#imports)
```js title="imports"
import React from 'react';
```

[mdis]:# (./tests/files/named-blocks.js#render)
```js title="render"
render() {
  return <div>Sample</div>;
}
```
`````
  
### Overlapping sections

**📜 .JS file with `mdis-` comments**
`````js
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
> In an .MD file, `[mdis](./tests/files/intersection.js)` will turn into:
  
**🤖 .MD file after _mdis_ lib processing**
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
  
### Raw import

**📄 ._YAML_ file with `mdis-` comments**
`````yaml
docker:
# mdis-start
  - image: ubuntu:14.04
# mdis-stop
  - image: mongo:2.6.8
    command: [mongod, --smallfiles]
  - image: postgres:9.4.1
`````
> In an .MD file, `[mdis](./tests/files/config.yaml)` will turn into:
  
**🤖 .MD file after _mdis_ lib processing**
`````markdown
[mdis]:# (./tests/files/config.yaml)
```yaml
docker:
# mdis-start
  - image: ubuntu:14.04
# mdis-stop
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
