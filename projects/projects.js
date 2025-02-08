import { fetchJSON, renderProjects } from '../global.js';
const projects = await fetchJSON('../lib/projects.json');
const projectsTitle = document.querySelector('.projects-title');
const searchInput = document.querySelector('.searchBar');
const projectsContainer = document.querySelector('.projects');
renderProjects(projects, projectsContainer, 'h2');

const count = document.querySelector('.projects-title');
count.textContent = projects.length + " Projects";

import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm";

let selectedIndex = -1;

function renderPieChart(projectsGiven) {
  let newRolledData = d3.rollups(
      projectsGiven,
      (v) => v.length,
      (d) => d.year
  );

  let newData = newRolledData.map(([year, count]) => {
      return { label: year, value: count };
  });

  let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);
  let sliceGenerator = d3.pie().value((d) => d.value);
  let newArcData = sliceGenerator(newData);
  let newArcs = newArcData.map((d) => arcGenerator(d));

  let svg = d3.select('svg');
  svg.selectAll('path').remove();
  let legend = d3.select('.legend');
  legend.html('');

  let colors = d3.scaleOrdinal(d3.schemeTableau10);

  newArcs.forEach((arcPath, idx) => {
      svg.append('path')
          .attr('d', arcPath)
          .attr('fill', colors(idx))
          .on('click', () => {
              selectedIndex = (selectedIndex === idx) ? -1 : idx;

              svg
                .selectAll('path')
                .attr('class', (_, idx) => idx === selectedIndex ? 'selected' : '');

              legend
                .selectAll('li')
                .attr('class', (_, idx) => idx === selectedIndex ? 'selected' : '');

              if (selectedIndex === -1) {
                  renderProjects(projects, projectsContainer, 'h2');
              } else {
                  const selectedYear = newData[selectedIndex].label;
                  const filteredProjects = projects.filter(project => project.year === selectedYear);
                  renderProjects(filteredProjects, projectsContainer, 'h2');
              }
          });
  });

  newData.forEach((d, idx) => {
      legend.append('li')
          .attr('style', `--color:${colors(idx)}`)
          .html(`<span class="swatch" style="background-color:${colors(idx)}"></span> ${d.label} <em>(${d.value})</em>`);
  });

  legend.selectAll('li')
      .attr('class', (_, idx) => idx === selectedIndex ? 'selected' : '');
}

renderPieChart(projects);

function setQuery(queryString) {
  return projects.filter(project => {
      let values = Object.values(project).join('\n').toLowerCase();
      return values.includes(queryString.toLowerCase());
  });
}

searchInput.addEventListener('input', (event) => {
  let filteredProjects = setQuery(event.target.value);

  renderProjects(filteredProjects, projectsContainer, 'h2');
  if (projectsTitle) {
      projectsTitle.textContent = `${filteredProjects.length} Projects`;
  }

  selectedIndex = -1;
  renderPieChart(filteredProjects);
});