# Repo Guide

This repository is a static GitHub Pages portfolio for Nathan Peredery.

## Project Layout

- `index.html` is the homepage.
- `software.html`, `mechanical.html`, `electronic.html`, and `integrated.html` are the top-level branch pages.
- `projects/` contains the individual project pages.
- `data/projects.json` is the source of truth for project metadata.
- `scripts/build-project-cards.js` generates the project preview cards into the HTML pages.
- `assets/site.css` and `assets/site.js` contain shared styling and behavior.
- `assets/images/` stores the banner artwork used by project cards.

## How To Work In This Repo

- Treat the site as static. Do not introduce a runtime backend.
- When adding or changing projects, edit `data/projects.json` first.
- If project cards should change on any page, run `npm run build` to regenerate the static HTML.
- Keep links explicit. Use `index.html` for the homepage link instead of relying on directory resolution.
- Preserve the tagged card placeholders in the HTML pages:
  - `<!-- PROJECT_CARDS:featured -->`
  - `<!-- PROJECT_CARDS:software -->`
  - `<!-- PROJECT_CARDS:mechanical -->`
  - `<!-- PROJECT_CARDS:electronic -->`
  - `<!-- PROJECT_CARDS:integrated -->`

## Project Metadata Expectations

Each project entry in `data/projects.json` should include:

- `slug`
- `title`
- `summary`
- `tags`
- `image`
- `url`
- `order`

Notes:

- `tags` can include multiple values so a project can appear in more than one section.
- `image` should point to a banner asset under `assets/images/` or another static path.
- `url` should point to the project HTML page under `projects/`.

## Editing Rules

- Use `apply_patch` for manual file edits.
- Prefer ASCII text unless a file already clearly uses something else.
- Do not remove user changes outside the task scope.
- Keep the visual language aligned with the ASCII mockup style.

## Verification

- Run `npm run build` after changing project metadata or card layout.
- Use `git diff --check` to catch formatting issues.
- Make sure the generated pages still link correctly from the branch pages and homepage.
