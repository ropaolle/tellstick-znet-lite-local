const chalk = require('chalk');

module.exports.logger = data => async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(
    `${ctx.method} ${ctx.url} - ${ms} ms (${
      data.locals.status === 'error'
        ? chalk.red(data.locals.status)
        : chalk.green(data.locals.status)
    }) - ${data.locals.uri}`,
  );
};
