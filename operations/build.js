const execute = require('../helpers').execute;
const chalk = require('chalk');

const buildContainer = (context, container) => {
  if (container.isExternal) {
    return;
  }
  const target = `${context.root}/containers/${container.name}`;
  console.log(`       Building ${chalk.bold.yellow(container.name)} in ${chalk.bold.yellow(target)}`);
  const imageName = `${context.namespace}-${container.name}-local`;
  const dockerfile = `${target}/${container.dockerfile || 'Dockerfile.dev'}`;
  execute(`docker build -f ${dockerfile} -t ${imageName} ${target}`);
};

module.exports = (context, args) => {
  console.log('');
  console.log(chalk.green('     Building containers...'));

  let containersToBuild;
  if (args && args[0]) {
    containersToBuild = context.containers.filter((c) => c.name === args[0]);
  } else {
    containersToBuild = context.containers.filter((c) => !c.isExternal);
  }

  containersToBuild.forEach((c) => buildContainer(context, c));

  console.log('');
  console.log(chalk.green('    ...done!'));
  console.log('');

};