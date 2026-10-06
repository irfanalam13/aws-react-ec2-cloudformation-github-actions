// Checks src/data/profile.json before the build, so students get a clear error
// instead of a confusing build failure. Run locally with: npm run validate
import { existsSync, readFileSync } from 'node:fs';

const FILE = 'src/data/profile.json';
const REQUIRED = ['name', 'tagline', 'roll', 'department', 'year', 'email', 'cgpa'];
const inCI = process.env.GITHUB_ACTIONS === 'true';
const errors = [];

// In GitHub Actions, "::error" lines show up as red annotations on the run page.
const fail = (msg) => errors.push(msg);

let profile;
try {
  profile = JSON.parse(readFileSync(FILE, 'utf8'));
} catch (err) {
  fail(`${FILE} is not valid JSON: ${err.message}. Check for a missing comma, quote or bracket.`);
}

if (profile) {
  for (const key of REQUIRED) {
    if (typeof profile[key] !== 'string' || profile[key].trim() === '') {
      fail(`"${key}" is missing or empty in ${FILE}.`);
    }
  }

  if (profile.photo && !existsSync(`public/${profile.photo}`)) {
    fail(`Photo "public/${profile.photo}" not found. The file name must match exactly (case-sensitive).`);
  }

  for (const key of ['skills', 'quotes']) {
    if (profile[key] !== undefined && !Array.isArray(profile[key])) {
      fail(`"${key}" must be a list, e.g. ["one", "two"].`);
    }
  }
}

if (errors.length > 0) {
  for (const msg of errors) console.log(inCI ? `::error file=${FILE}::${msg}` : `✗ ${msg}`);
  process.exit(1);
}

console.log(`✓ ${FILE} looks good.`);
