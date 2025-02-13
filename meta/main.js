let data = [];

async function loadData() {
    data = await d3.csv('loc.csv', (row) => ({
        ...row,
        line: Number(row.line), // or just +row.line
        depth: Number(row.depth),
        length: Number(row.length),
        date: new Date(row.date + 'T00:00' + row.timezone),
        datetime: new Date(row.datetime),
    }));
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadData();
});

let commits = [];

function processCommits() {
    commits = d3
        .groups(data, (d) => d.commit)
        .map(([commit, lines]) => {
            // Each 'lines' array contains all lines modified in this commit
            // All lines in a commit have the same author, date, etc.
            // So we can get this information from the first line
            let first = lines[0];
  
            // What information should we return about this commit?
            return {
                id: commit,
                // ... what else?
            };
        });
}