console.log("IT'S ALIVE!");

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

// let navLinks = $$("nav a");

// let currentLink = navLinks.find(
//     (a) => a.host === location.host && a.pathname === location.pathname
// );

// currentLink?.classList.add('current');

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
    nav.insertAdjacentHTML('beforeend', `<a href="https://isaiahfang.github.io/portfolio/">Home</a>`);
    nav.insertAdjacentHTML('beforeend', `<a href="https://isaiahfang.github.io/portfolio/projects/">Projects</a>`);
    nav.insertAdjacentHTML('beforeend', `<a href="https://isaiahfang.github.io/portfolio/contact/">Contact</a>`);
    nav.insertAdjacentHTML('beforeend', `<a href="https://github.com/isaiahfang">Github</a>`);
}
