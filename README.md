# Vanilla SPA
Simple single-page app written in vanilla js. It uses Handlebars for templating and Navigo for routing.

## About
Tired of compilers, build-scripts, dependancy hell and `npm audit fix`? This refreshingly simple Single Page App (SPA) has no shadow dom or build pipelines and does just enough to be useful.

Vanilla SPA also runs in environments that do not support Nodejs such as Object Storage or shared hosting and can be edited on the fly without waiting for a compiler or a build pipeline.

## Demo
https://vanilla-spa-wine.vercel.app/

## History.pushState() Routing
Vanilla SPA supports history.pushState() routing, which gives you clean URLs (no #hash). Another advantage is that you can prerender you pages via a service like https://prerender.com, effectively turning you SPA into a static site!

For history.pushState() to work, you need to redirect all requests to index.html. Below are some examples on how to configure this on different platforms:

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
More info: https://vercel.com/docs/configuration#routes

### Netlify
Add a `_redirects` file containing the following:
```
/*    /index.html   200
```
More info: https://docs.netlify.com/routing/redirects/rewrites-proxies/#history-pushstate-and-single-page-apps

### Apache
Create a `.htaccess` file containing the following:
```
RewriteEngine on
RewriteCond %{REQUEST_URI} !^/index.html$
RewriteCond %{REQUEST_URI} !\.(gif|jpe?g|png|css|js)$
RewriteRule .* /index.html [L,R=302]
```
