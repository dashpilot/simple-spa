const app = document.getElementById('app');

async function init() {

  Handlebars.registerHelper('ifEq', function(v1, v2, options) {
    if (v1 === v2) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

  const res = await fetch(`data.json`)
  const json = await res.json();

  const router = new Navigo('/');
  router.on('/', function() {
    // do something
    app.innerHTML = renderTemplate('main', 'home', json);
  });
  router.on('/blog', function() {
    app.innerHTML = renderTemplate('main', 'blog', json);
  });
  router.resolve();

}

init();

function renderTemplate(tmpId, page, json) {
  var template = document.getElementById(tmpId).innerHTML;
  var templateScript = Handlebars.compile(template);
  // filter entries for this page
  var data = {};
  data.entries = json.entries.filter(x => x.page == page);
  var html = templateScript(data);
  return html;
}