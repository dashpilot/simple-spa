# simple-spa
Simple single-page app written in vanilla js

## About
Tired of compilers, build-scripts, dependancy hell and `npm audit fix`? This refreshingly simple Single Page App (SPA) has exactly one dependancy (handlebars), no shadow dom or build pipelines and does just enough to be useful.

Simple SPA also runs in environments that do not support Nodejs such as Object Storage or shared hosting and can be edited on the fly without waiting for a compiler or a build pipeline.

## History.pushState() Routing
Simple SPA supports history.pushState() routing, which gives you clean URLs (no #hash). Another advantage is that you can prerender you pages via a service like https://prerender.com, effectively turning you SPA into a static site!

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

### Amazon S3
For Amazon S3 (or S3-compatible storage like Linode Object Storage) be sure to set the `ErrorDocument` to `index.html`, for example using the Nodejs SDK for AWS:
```
  WebsiteConfiguration: {
    ErrorDocument: {
      Key: 'index.html'
    },
    IndexDocument: {
      Suffix: 'index.html'
    },
  }
```
More info: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-static-web-host.html

### BunnyCDN Storage
Bunnycdn has a great feature that allows you to host files directly on their CDN, and you can host static sites too! To enable redirects create a folder called `bunnycdn_errors` and inside that folder put a file called `404.html` which should have the same contents as your index.html
More info: https://support.bunny.net/hc/en-us/articles/360000332631-How-do-I-configure-a-custom-404-page-for-my-storage-zone

### Apache
Create a `.htaccess` file containing the following:
```
RewriteEngine on
RewriteCond %{REQUEST_URI} !^/index.html$
RewriteCond %{REQUEST_URI} !\.(gif|jpe?g|png|css|js)$
RewriteRule .* /index.html [L,R=302]
```
