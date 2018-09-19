const chalk = require('chalk');
const pkg = require('../package');
const funcs = require('./funcs');
const util = require('./util');

exports.print = ({
    port,
    timeout,
    cacheMaxAge,
}) => {

    return `  

  ██████╗ █████╗  ██████╗██╗  ██╗██╗███████╗██╗   ██╗██████╗ ███████╗███████╗████████╗
 ██╔════╝██╔══██╗██╔════╝██║  ██║██║██╔════╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔════╝╚══██╔══╝
 ██║     ███████║██║     ███████║██║█████╗   ╚████╔╝ ██████╔╝█████╗  ███████╗   ██║   
 ██║     ██╔══██║██║     ██╔══██║██║██╔══╝    ╚██╔╝  ██╔══██╗██╔══╝  ╚════██║   ██║ ${chalk.blue.bold(pkg.version)}
 ╚██████╗██║  ██║╚██████╗██║  ██║██║██║        ██║   ██║  ██║███████╗███████║   ██║ ${chalk.white.bgRed.bold('FanapSoft')}
  ╚═════╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝╚═╝        ╚═╝   ╚═╝  ╚═╝╚══════╝╚══════╝   ╚═╝ 
                                                                                      
 ${chalk.white.bgRed.bold(`Cache server listening on port ${port} !`)}
 ─────────────────────────────────────
 - ${chalk.blue.bold('Request Timeout')}   : ${timeout}ms / ${funcs.millisToMinutesAndSeconds(timeout)} m:s
 - ${chalk.blue.bold('Cache MaxAge')}      : ${cacheMaxAge}ms / ${funcs.millisToMinutesAndSeconds(cacheMaxAge)} m:s
 - ${chalk.blue.bold('Server Port')}       : ${port}
 - ${chalk.blue.bold('Server Addresses')}  :
${util.ips().toString()}
 ─────────────────────────────────────
 - Resources 
    CPU  : -
    RAM  : rss       ${chalk.green(Math.round(process.memoryUsage().rss / 1024 / 1024 * 100) / 100 + ' MB')}
           heapTotal ${chalk.green(Math.round(process.memoryUsage().heapTotal / 1024 / 1024 * 100) / 100 + ' MB')}
           heapUsed  ${chalk.green(Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100 + ' MB')}
           external  ${chalk.green(Math.round(process.memoryUsage().external / 1024 / 1024 * 100) / 100 + ' MB')}
 ─────────────────────────────────────
  
  `;
};