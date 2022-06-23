const {execSync} = require('child_process');
const fs = require('fs');

const execSyncWrapper = command => execSync(command).toString().trim();
const gitBranch = execSyncWrapper('git rev-parse --abbrev-ref HEAD');
const gitCommitHash = execSyncWrapper('git rev-parse HEAD');

const gitInfo = {
  gitBranch,
  gitCommitHash
};

fs.writeFileSync('./src/components/@core/gitInfo/generatedGitInfo.json', `${JSON.stringify(gitInfo, null, 2)}\n`);
