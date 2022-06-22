const {execSync} = require('child_process');
const fs = require('fs');
const path = require('path');

const execSyncWrapper = command => execSync(command).toString().trim();
const gitBranch = execSyncWrapper('git rev-parse --abbrev-ref HEAD');
const gitCommitHash = execSyncWrapper('git rev-parse HEAD');

const obj = {
  gitBranch,
  gitCommitHash
};

const filePath = path.resolve('src/components/@core/gitInfo', 'generatedGitInfo.json');
const fileContents = JSON.stringify(obj, null, 2);

fs.writeFileSync(filePath, `${fileContents}\n`);
