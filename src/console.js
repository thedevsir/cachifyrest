const chalk = require('chalk');
const pkg = require('../package');
const funcs = require('./funcs');
const util = require('./util');

let analyze = require('./analyze');

exports.print = ({
    port,
    timeout,
    cacheMaxAge,
}) => {

    const convertToMB = (mu) => {
        return Math.round(mu / 1024 / 1024 * 100) / 100 + 'MB';
    };

    const leftSide = ` - ${chalk.blue.bold('Request Timeout')}   : ${timeout}ms / ${funcs.millisToMinutesAndSeconds(timeout)} m:s
 - ${chalk.blue.bold('Cache MaxAge')}      : ${cacheMaxAge}ms / ${funcs.millisToMinutesAndSeconds(cacheMaxAge)} m:s
 - ${chalk.blue.bold('Server Port')}       : ${port}
 - ${chalk.blue.bold('Server Addresses')}  :
${util.ips().toString()}
 ──────────────────────────────────
 - ${chalk.underline.blue.bold('MemoryUsage')} : rss       ${chalk.green(convertToMB(process.memoryUsage().rss))}
                 heapTotal ${chalk.green(convertToMB(process.memoryUsage().heapTotal))}
                 heapUsed  ${chalk.green(convertToMB(process.memoryUsage().heapUsed))}
                 external  ${chalk.green(convertToMB(process.memoryUsage().external))}`;

    const rightSide = ` - ${chalk.underline.blue.bold('Requests')}
   ${chalk.white('ToCacheServer')} : ${analyze.requests.count.allToCacheServer}
   ${chalk.white('ToRealServer')}  : ${analyze.requests.count.allToRealServer}

 - ${chalk.underline.blue.bold('Response')}
   ${chalk.white('All')}            : ${analyze.responses.count.allFromCacheServer}
   ${chalk.white('FromRealServer')} : ${analyze.responses.count.allFromRealServer}
   ${chalk.white('FromCache')}      : ${analyze.responses.count.allFromCache}

 - ${chalk.underline.blue.bold('Cache')}
   ${chalk.white('Store length')} : ${analyze.store.length}   
 `;

    return `  

  ██████╗ █████╗  ██████╗██╗  ██╗██╗███████╗██╗   ██╗██████╗ ███████╗███████╗████████╗
 ██╔════╝██╔══██╗██╔════╝██║  ██║██║██╔════╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔════╝╚══██╔══╝
 ██║     ███████║██║     ███████║██║█████╗   ╚████╔╝ ██████╔╝█████╗  ███████╗   ██║   
 ██║     ██╔══██║██║     ██╔══██║██║██╔══╝    ╚██╔╝  ██╔══██╗██╔══╝  ╚════██║   ██║ ${chalk.blue.bold(pkg.version)}
 ╚██████╗██║  ██║╚██████╗██║  ██║██║██║        ██║   ██║  ██║███████╗███████║   ██║ ${chalk.white.bgRed.bold('FanapSoft')}
  ╚═════╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝╚═╝        ╚═╝   ╚═╝  ╚═╝╚══════╝╚══════╝   ╚═╝ 
                                                                                      
${chalk.white.bgRed.bold(` Cache server listening on port ${port} !`)}
${util.panel(leftSide, rightSide).toString()}

`;
};