const appEl = document.getElementById('app');

async function hashHandler() {
  const hash = !location.hash ? '#/' : location.hash;
  json.page = curPage(hash);
  appEl.innerHTML = renderTemplate('main');
}

async function init() {

  Handlebars.registerHelper('ifEq', function(v1, v2, options) {
    if (v1 === v2) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

  const hash = !location.hash ? '#/' : location.hash;
  const res = await fetch(`data.json`)
  json = await res.json();
  json.page = curPage(hash);
  appEl.innerHTML = renderTemplate('main');
}

function renderTemplate(tmpId) {
  console.log(json);
  var template = document.getElementById(tmpId).innerHTML;
  var templateScript = Handlebars.compile(template);
  // filter entries for this page
  var data = {};
  data.entries = json.entries.filter(x => x.page == json.page);
  var html = templateScript(data);
  return html;
}

function curPage(hash) {
  let page = hash.replace('#/', '');
  if (page == '') {
    page = 'home';
  }
  console.log('Current page:', page);
  return page;
}

init();

window.addEventListener('hashchange', hashHandler, false);