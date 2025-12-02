 # Nodemon
 
## What it does:
Automatically restarts Node.js application when file changes are detected.

## Installation:
# Install globally (can use anywhere)
```js
npm install -g nodemon
```
# Install as dev dependency (project only)
```js
npm install nodemon --save-dev
```
## Usage:
### Instead of: node index.js
### Use:
```js
nodemon index.js
```
### With package.json scripts:
- Add to package.json:

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
}
```
## Run with script:
```js
npm run dev
```
### Benefits:
- No manual server restart

- Automatic reload on file changes

- Great for development

