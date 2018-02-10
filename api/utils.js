const chalk = require('chalk');

module.exports.logger = data => async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(
    `${ctx.method} ${ctx.url} - ${ms} ms (${
      data.locals.success
        ? chalk.green('SUCCESS')
        : chalk.red('ERROR')
    }) - ${data.locals.uri}`,
  );
};
