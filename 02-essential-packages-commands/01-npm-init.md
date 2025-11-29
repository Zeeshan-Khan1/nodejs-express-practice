# npm init

## What it does:
Creates `package.json` file for your Node.js project.

## Syntax:
```js
npm init
```
### Steps:
- Run in terminal: npm init

- Answer questions about your project

- Creates package.json file

### Quick setup:
```js
npm init -y
```
-y flag = yes to all defaults

### Result:
- Creates package.json with:
```js
json
{
  "name": "your-project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```
