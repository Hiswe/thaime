'use strict'

const shell = require('shelljs')
const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs')

const pkg = require(`../package.json`)
const BRANCH = `firebase`

if (!shell.which(`git`)) {
  shell.echo(`Sorry, this script requires git`)
  shell.exit(1)
}
if (!shell.which(`yarn`)) {
  shell.echo(`Sorry, this script requires yarn`)
  shell.exit(1)
}

initRelease()

async function initRelease() {
  ////////
  // BUMP
  ////////

  const bumping = await inquirer.prompt([
    {
      type: `list`,
      name: `bump`,
      message: `bump for release? (this will also commit a git tag)`,
      choices: [{ name: `yes`, value: true }, { name: `no`, value: false }],
    },
    {
      name: `version`,
      message: `version number? (actual is ${pkg.version})`,
      when: data => data.bump,
      validate: value => /\d+\.\d+\.\d+/.test(value),
    },
    {
      type: `confirm`,
      name: `confirm`,
      when: data => data.version,
      message: data => `do you confirm version ${data.version}?`,
    },
  ])

  if (bumping.version && !bumping.confirm) {
    shell.echo(`canceling bumping & release`)
    shell.exit(0)
  }

  if (bumping.version) {
    shell.echo(`bumping…`)
    shell.exec(`yarn bump --to=${bumping.version}`, { silent: true })
    shell.echo(`…bumping done!`)
  }

  ////////
  // BUILD
  ////////

  shell.echo(`building…`)
  shell.exec(`yarn build`, { silent: true })
  shell.echo(`…building done!`)

  ////////
  // FIREBASE RELEASE
  ////////

  ////////
  // TAG
  ////////

  shell.exit(0)
}

function deployToFirebase() {}

// const currentBranch = shell.exec(`git branch`, { silent: true }).grep(/^\*/)
// const branchName = currentBranch.stdout.replace(/[\*\n\s]/g, ``)

// if (branchName !== `master`) {
//   shell.echo(`Sorry, you need to be on the master branch`)
//   shell.exit(1)
// }

// ////////
// // DEPLOYING TO FIREBASE
// ////////

// if (!bc.isGhRelease) {
//   shell.echo(`Deploying to firebase…`)
//   const firebaseDeploy = shell.exec(`yarn run firebase deploy`, {
//     silent: true,
//   })
//   if (firebaseDeploy.code !== 0) {
//     shell.echo(`Unable deploy to firebase`)
//     shell.echo(firebaseDeploy.stderr)
//     shell.exit(1)
//   }
//   shell.echo(`…deployed`)
// }

// ////////
// // INITIALIZING FOLDERS & HELPERS
// ////////

// const originalDir = shell.pwd()
// const copydir = shell.exec(`mktemp -d /tmp/thailpha.XXX`, { silent: true })
// // stdout come with a linebreak. Remove it for better path joining
// const copydirPath = copydir.stdout.replace(`\n`, ``)

// const teardown = () => {
//   shell.cd(originalDir)
//   shell.rm(`-Rf`, copydir)
// }

// shell.echo(`temp dir will be created at: ${copydirPath}`)

// ////////
// // COPYING FILES TO TMP
// ////////

// shell.echo(`begin copy…`)

// //----- GIT FILES

// shell.echo(`…git files…`)
// shell.cp(`-r`, `./.git/.`, path.join(copydirPath, `/.git`))

// //----- DIST FILES

// shell.echo(`…dist files…`)
// shell.cp(`-r`, `./dist/*`, copydir)
// shell.echo(`…copy end`)
// shell.cd(copydir)

// ////////
// // GIT
// ////////

// //----- SETTING A NEW BRANCH

// const tmpBranchName = `${BRANCH}-${version}`
// shell.echo(`checking out “${tmpBranchName}” branch`)

// // orphan branch for having a clean new branch
// const gitCheckout = shell.exec(`git checkout --orphan ${tmpBranchName} `, {
//   silent: true,
// })
// if (gitCheckout.code !== 0) {
//   shell.echo(`Unable to checkout`)
//   shell.echo(gitCheckout.stderr)
//   teardown()
//   shell.exit(1)
// }

// //----- ADDING THE FILES

// shell.exec(`git add .`, { silent: true })
// shell.exec(`git commit -m "RELEASE – version ${version}"`, { silent: true })

// //----- PUSHING THE FILES

// shell.echo(`pushing to “${BRANCH}” branch…`)
// const ghPagePush = shell.exec(
//   `git push origin ${tmpBranchName}:${BRANCH} --force`,
//   { silent: true }
// )
// if (ghPagePush.code !== 0) {
//   shell.echo(`Error: Git push failed`)
//   shell.echo(ghPagePush.stderr)
//   teardown()
//   shell.exit(1)
// } else {
//   shell.echo(`…push done!`)
// }

// //----- TAGGING THE VERSION

// if (bc.skipBump) {
//   shell.echo(`Skipping pushing tag`)
//   shell.exit(0)
// }

// shell.echo(`tagging version…`)
// shell.exec(`git tag v${version}`, { silent: true })
// const tagPush = shell.exec(`git push --tags`, { silent: true })
// if (tagPush.code !== 0) {
//   shell.echo(`Error: Git tag push failed`)
//   shell.echo(tagPush.stderr)
//   teardown()
//   shell.exit(1)
// } else {
//   shell.echo(`…tag push done!`)
// }

// // TEARDOW
// teardown()
