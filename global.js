console.log("IT'S ALIVE!");

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

let pages = [
    { url: '', title: 'Home' },
    { url: 'projects/', title: 'Projects' },
    { url: 'resume/', title: 'Resume' },
    { url: 'contact/', title: 'Contact' },
    { url: 'https://github.com/isaiahfang', title: 'Github' },
];

let nav = document.createElement('nav');
document.body.prepend(nav);

for (let p of pages) {
    let url = p.url;
    let title = p.title;
    let a = document.createElement('a');
    a.href = url;
    a.textContent = title;
    nav.append(a);
}

const ARE_WE_HOME = document.documentElement.classList.contains('home');

url = !ARE_WE_HOME && !url.startsWith('http') ? '../' + url : url;

a.classList.toggle(
    'current',
    a.host === location.host && a.pathname === location.pathname
);

a.classList.toggleAttribute(
    '_blank',
    a.host !== location.host
);