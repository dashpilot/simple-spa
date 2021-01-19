# simple-spa
Simple single-page app written in vanilla js

## About
Tired of compilers, build-scripts, dependancy hell and `npm audit fix`? This refreshingly simple Single Page App (SPA) has exactly one dependancy (handlebars), no shadow dom or build pipelines and does just enough to be useful.

Simple SPA also runs in environments that do not support Nodejs such as Object Storage or shared hosting and can be edited on the fly without waiting for a compiler or a build pipeline.

## Routing
Simple SPA supports hash-based as well as history.pushState() routing. For the latter to work, you need to redirect all requests to index.html. Below are some examples on how to configure this on different platforms:

### http-server (for local testing)
`http-server --port 8080 -P http://localhost:8080?`

### Vercel
Add a vercel.json file with the following contents:
```
{
  "routes": [{
      "handle": "filesystem"
    },
    {
      "src": "/.*",
      "dest": "/index.html"
    }
  ]
}
```
### Netlify
Add a `_redirects` file containing the following:\
`/*    /index.html   200`
