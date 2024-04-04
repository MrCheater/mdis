1. **THE "❓ _COMMENTS" (as shown below)_ ARE MY QUESTIONS; I NEED THEM ANSWERED IN ORDER TO MAKE THINGS PRECISE — THEY SHALL NOT BE PRESENT IN THE FINAL DOCUMENTATION.**
2. **THIS CURRENT AMOUNT IS NOT ALL QUESTIONS I HAVE; A COUPLE MORE WILL BE ADDED VERY SOON.**

> ❓ _ACCORDING TO THE `NPMJS`, THE LIB VERSON IS "0.0.9" (AS OF 2 YRS AGO) — DOES IT MEAN IT'S TECHNICALLY BETA? DO WE HAVE TO WARN PEOPLE ABOUT THAT?_

# mdis: MarkDown Include Source lib for JS

The library provides tools for supplementing your **Mardkown**
> ❓ _WHAT FLAVORS DOES THE LIB SUPPORT? IS THERE A POSSIBILITY THAT SOME WON'T BE SUPPORTED — OR DOES THE LIB SEE ALL RELATIVE LINK FORMATS (if there is any variance, that is) AS EQUAL?_

**files**
> ❓ _WHAT'S THE INTENDED ENVIRONMENT/PURPOSE + AUDIENCE OF THE LIB USE?_

with code snippets for more illustrative **inside-use documentation**;
> ❓ _AM I GUESSING RIGHT?_

_mdis_ **embeds**
> ❓ _DOES IT WORK FOR THE MD FILES ONLY, OR CAN IT ADD "SCREENSHOTS" OF THE SAME CODE SNIPPETS UPON PROCESSING THAT SAME MD FILE WITH THE TECH DOCUMENTATION SOFTWARE?_

and highlights **code snippets** 
> ❓ _IF YOU TRY TO USE IT WITH A LANGUAGE NOT SUPPORTED WHAT HAPPENS? WILL AT LEAST THE "SNIPPETS" THAT SPAN OVER A WHOLE DESTINATION FILE BE IMPORTED?_

in multiple **programming languages**,
> ❓ _IS IT NOT JS AND ITS FRAMEWORKS?_

including vanilla JavaScript and TypeScript.

## Key Features:
📜 **Supports** vanilla JavaScript, TypeScript, …
> ❓ _WHAT ELSE? I DEFINITELY SAW SOME REACT AND NODE REFFERENCES IN THE REPO_

🔧 **Easy** to integrate and _**customize**_: …
> ❓ _WHICH YOU CAN DO HOW AND TO WHAT EXTENT?_

🌱 **User-friendly** and fully accessible
> ❓ _"FULLY ACCESSIBLE" AS IN WHAT? ❓ SEEMS LIKE THE LINE DOES NOT ADD ANYTHING NEW TO THE ABOVE INFO — AS IS, AT LEAST_

⚡ **Lightweight and fast**

***

## Installation
You will need to import _mdis_ separately for each of your projects. We suggest importing it as a development stage component:
```powershell
npm install mdis --save-dev
```
> ❓ I SUPPOSE THE THE INTENDED AUDIENCES WOULD KNOW WHAT TO EXPECT FROM THE `--save-dev` SETTING BY THEMSELVES

## Use options and output examples
> We recommend reading the below section with this repo file tree open in a separate tab: that way you will better see the _MD doc input_ ⇒ _MD doc + mdis result_ logic.

> ❓ _I WILL TRY AND FIND OUT MYSELF, BUT IT WOULD STILL BE GREAT IF YOU CLARIFIED WHAT EXACTLY EACH OPTION DOES._ 

#### Simple block
> ❓ **IT WOULD BE NICE IF EITHER:**  
> **A)** THE RIGHT COLUMT (WHIS I ASSUME IS THE MDIS OUTPUT FROM THE LEFT COLUMN INPUT) USED SCREENSHOTS AND NOT JUST TEXT, OR  
> **B)** (I suppose it might be a naiive idea)  THE MDIS ITSELF WAS INSTALLED FOR THE REPO AND DID ITS JOB FOR THE SAID RIGHT COLUMN
>
> **(MORE COMMENTS COMING)**
>
> CHANGED THE **FILE PATHS**, TOO; PLEASE CHECK IF IM RIGHT IN MY ASSUMPTIONS
 
<table>
<tr>
<th>Markdown</th>
<th>Added snippet</th>
</tr>
<tr>
<td>
<pre>
[mdis]:# (./tests/files/simple.js)
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

#### Named block
<table>
<tr>
<th>Markdown</th>
<th>Added snippet</th>
</tr>
<tr>
<td>
<pre>
[mdis]:# (.tests/files/named-blocks.js#imports)
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


#### Intersection
<table>
<tr>
<th>Markdown</th>
<th>Added snippet</th>
</tr>
<tr>
<td>
<pre>
[mdis]:# (.tests/files/intersection.js#yellow)
```js
'banana',
'sun',
'lemon',
```
</pre>
<pre>
[mdis]:# (.tests/files/intersection.js#round)
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
<th>Added snippet</th>
</tr>
<tr>
<td>
<pre>
[mdis]:# (.tests/files/config.yaml)
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
