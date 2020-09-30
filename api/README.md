# Fake API

## JSON-Server
Using [`json-server`](https://github.com/typicode/json-server) allows for quick offline testing of the HTTPClient functionality of the app during local development.

## Files
This folder contains the files called by the `npm run dev-api` in `package.json`:
```
"dev-api": "json-server -c dev-api/config.json dev-api/db.json",
```
The config file `dev-api/config.json` specifies:
- `"port": 3004`    to avoid default Docker port
- `"watch": true`    to watch files for changes
- `"routes": "api/routes.json"` => `"/api/*": "/$1"`;
- `"no-cors": true`    for proxy used during development

## Proxy
During development, API calls are redirected to `json-server` using Angular `proxy.conf.json`:
```
  "/api": {
    "target": "http://localhost:3004"
  }
```

## Database
The database file `db.json` has 3 containers:
- settings
- departments
- employees

For this project, the production Angular Realtime Database is also generated from this file.
After use, the database can be reset from the backup data provided in `db.backup.json`.