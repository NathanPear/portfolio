const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const dataPath = path.join(repoRoot, 'data', 'projects.json');

const pageConfigs = [
  { file: 'index.html', tag: 'featured', marker: 'featured' },
  { file: 'index.html', tag: 'resume', marker: 'resume' },
  { file: 'software.html', tag: 'software', marker: 'software' },
  { file: 'mechanical.html', tag: 'mechanical', marker: 'mechanical' },
  { file: 'electronic.html', tag: 'electronic', marker: 'electronic' },
  { file: 'integrated.html', tag: 'integrated', marker: 'integrated' },
];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function relUrl(fromFile, toFile) {
  const fromDir = path.dirname(fromFile);
  const relative = path.relative(fromDir, path.join(repoRoot, toFile));
  return relative.split(path.sep).join('/');
}

function renderCard(project, pageFile) {
  const url = relUrl(pageFile, project.url);
  const tags = project.tags
    .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`)
    .join('');

  const imageDiv = project.image
    ? `    <div class="panel-image"><img alt="${escapeHtml(project.title)} banner" src="${relUrl(pageFile, project.image)}" /></div>`
    : '';

  const lines = [
    `<a class="ascii-box project-card" href="${url}">`,
    '  <span class="rule-line" data-rule="="></span>',
    '  <div class="box-content">',
  ];

  if (imageDiv) {
    lines.push(imageDiv);
  }

  lines.push(
    '    <div class="project-body">',
    `      <h3>${escapeHtml(project.title)}</h3>`,
    `      <p>${escapeHtml(project.summary)}</p>`,
    `      <div class="tags">${tags}</div>`,
    '    </div>',
    '  </div>',
    '  <span class="rule-line" data-rule="="></span>',
    '</a>'
  );

  return lines.join('\n');
}

function replaceCardBlock(html, markerName, replacement) {
  const pattern = new RegExp(
    `(<!--\\s*PROJECT_CARDS:${markerName}\\s*-->)([\\s\\S]*?)(<!--\\s*\\/PROJECT_CARDS\\s*-->)`,
    'm'
  );

  if (!pattern.test(html)) {
    throw new Error(`Could not find card marker "${markerName}"`);
  }

  return html.replace(pattern, `$1\n${replacement}\n$3`);
}

const projects = readJson(dataPath).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

for (const config of pageConfigs) {
  const pagePath = path.join(repoRoot, config.file);
  let html = fs.readFileSync(pagePath, 'utf8');
  const cards = projects
    .filter((project) => Array.isArray(project.tags) && project.tags.includes(config.tag))
    .map((project) => renderCard(project, pagePath))
    .join('\n\n');

  html = replaceCardBlock(html, config.marker, cards);
  fs.writeFileSync(pagePath, html, 'utf8');
}

console.log(`Generated project cards for ${pageConfigs.length} pages.`);
