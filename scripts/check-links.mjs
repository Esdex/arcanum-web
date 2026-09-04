/*
 * Every internal link in the built site must point at the address the site actually
 * serves - with its trailing slash, and at a page that exists.
 *
 * Why it is worth a check of its own: GitHub Pages answers /docs/faq with a 301 to
 * /docs/faq/, so a link missing that slash still works for a reader and still costs
 * something. Google crawls the address it was given, files it under "Page with
 * redirect", and keeps it in Search Console indefinitely - and a validation of that
 * report can never pass, because the redirect is correct and is not going anywhere.
 * Two such links (the footer's /privacy, on every page of the site, and one in the
 * hidden-volumes page) is what put six of our own URLs in that report.
 *
 * Run after `astro build`; it reads dist/ and exits non-zero on the first kind of
 * failure it finds, listing every instance rather than only the first.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = 'dist';
const SITE = 'https://arcanum.zip';

/** Addresses that are files rather than pages, and are linked without a slash. */
const FILE_LIKE = /\.[a-z0-9]{2,5}$/i;

function htmlFiles(dir) {
  return readdirSync(dir).flatMap(name => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? htmlFiles(path)
         : name.endsWith('.html') ? [path]
         : [];
  });
}

const missingSlash = [];
const missingTarget = [];

for (const file of htmlFiles(DIST)) {
  const html = readFileSync(file, 'utf8');
  const page = relative(DIST, file);

  for (const match of html.matchAll(/href="([^"]+)"/g)) {
    let href = match[1];

    if (href.startsWith(SITE)) href = href.slice(SITE.length) || '/';
    // Anything else with a scheme, an anchor or a query belongs to someone else.
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    const path = href.split(/[?#]/)[0];
    if (path === '' || FILE_LIKE.test(path)) continue;

    if (!path.endsWith('/')) {
      missingSlash.push(`${page}: ${href}`);
      continue;   // its target is checked once the slash is there
    }

    try {
      statSync(join(DIST, path, 'index.html'));
    } catch {
      missingTarget.push(`${page}: ${href}`);
    }
  }
}

const report = (title, list) => {
  if (list.length === 0) return false;
  console.error(`\n${title} (${list.length}):`);
  for (const line of [...new Set(list)].sort()) console.error(`  ${line}`);
  return true;
};

const slashBad = report(
  'Internal links without a trailing slash - these are served as a redirect', missingSlash);
const targetBad = report(
  'Internal links pointing at a page that was not built', missingTarget);

if (slashBad || targetBad) {
  console.error('\nBuild rejected. Add the slash, or fix the address.\n');
  process.exit(1);
}

console.log('Internal links: every one ends in a slash and resolves to a built page.');
