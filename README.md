# TimeKeepers Vue

## Project setup
```
npm install
```

### Add .env file to main folder
Environment variable names must be:
```
JWT_SECRET
MONGO_URI
```

### Compiles and hot-reloads for development
Two parts: 
* client is the front-end Vue applicaton
* server is the back-end Nodejs application

In two different terminals run:
```
npm run client
```
and
```
nodemon server
```

## Troubleshooting and Production Build (below)
### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
