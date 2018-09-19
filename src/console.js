const chalk = require('chalk');
const pkg = require('../package');
const funcs = require('./funcs');
const util = require('./util');

exports.print = ({
    port,
    timeout,
    cacheMaxAge,
}) => {

    const convertToMB = (mu) => {
        return Math.round(mu / 1024 / 1024 * 100) / 100 + ' MB';
    };

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
   MemoryUsage : rss       ${chalk.green(convertToMB(process.memoryUsage().rss))}
                 heapTotal ${chalk.green(convertToMB(process.memoryUsage().heapTotal))}
                 heapUsed  ${chalk.green(convertToMB(process.memoryUsage().heapUsed))}
                 external  ${chalk.green(convertToMB(process.memoryUsage().external))}
 ─────────────────────────────────────
  
  `;
};