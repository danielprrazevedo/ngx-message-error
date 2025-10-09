#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const semver = require('semver');

const allowedBumps = ['patch', 'minor', 'major'];
const bumpType = process.argv[2];

if (!allowedBumps.includes(bumpType)) {
  console.error(`Usage: node scripts/release.js <${allowedBumps.join('|')}>`);
  process.exit(1);
}

const repoRoot = path.resolve(__dirname, '..');
process.chdir(repoRoot);

function run(command) {
  execSync(command, { stdio: 'inherit' });
}

function runAndCapture(command) {
  return execSync(command, { encoding: 'utf8' }).trim();
}

try {
  const status = runAndCapture('git status --porcelain');
  if (status) {
    console.error('Working tree must be clean before running the release script.');
    process.exit(1);
  }

  const rootPackagePath = path.join(repoRoot, 'package.json');
  const libraryPackagePath = path.join(repoRoot, 'projects', 'ngx-message-error', 'package.json');

  const rootPackage = JSON.parse(fs.readFileSync(rootPackagePath, 'utf8'));
  const libraryPackage = JSON.parse(fs.readFileSync(libraryPackagePath, 'utf8'));

  const currentVersion = libraryPackage.version;
  if (!semver.valid(currentVersion)) {
    console.error(`Invalid current version in library package: ${currentVersion}`);
    process.exit(1);
  }

  const newVersion = semver.inc(currentVersion, bumpType);
  if (!newVersion) {
    console.error('Failed to calculate new version.');
    process.exit(1);
  }

  libraryPackage.version = newVersion;
  rootPackage.version = newVersion;

  fs.writeFileSync(libraryPackagePath, JSON.stringify(libraryPackage, null, 2) + '\n');
  fs.writeFileSync(rootPackagePath, JSON.stringify(rootPackage, null, 2) + '\n');

  run('git add package.json projects/ngx-message-error/package.json');
  run(`git commit -m "chore(release): v${newVersion}"`);
  run(`git tag v${newVersion}`);
  run('git push origin HEAD');
  run('git push origin --tags');

  console.log(`Release v${newVersion} completed.`);
} catch (error) {
  console.error('Release script failed.');
  if (error && error.message) {
    console.error(error.message);
  }
  process.exit(1);
}
