const os = require('os');
const Table = require('cli-table');

exports.ips = () => {

    let tableServerAddresses = new Table({
        chars: {
            'top': '',
            'top-mid': '',
            'top-left': '',
            'top-right': '',
            'bottom': '',
            'bottom-mid': '',
            'bottom-left': '',
            'bottom-right': '',
            'left': '',
            'left-mid': '',
            'mid': '',
            'mid-mid': '',
            'right': '',
            'right-mid': '',
            'middle': ' '
        },
        style: {
            'padding-left': 2,
            'padding-right': 0
        }
    });

    let ifaces = os.networkInterfaces();

    tableServerAddresses.push({
        local: 'localhost',
    }, {
        local: '127.0.0.1',
    }, );

    Object.keys(ifaces).forEach(function (ifname) {

        let alias = 0;
        ifaces[ifname].forEach(function (iface) {

            if ('IPv4' !== iface.family || iface.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            }

            if (alias >= 1) {
                // this single interface has multiple ipv4 addresses
                tableServerAddresses.push({
                    [ifname + ':' + alias]: iface.address
                });
            } else {
                // this interface has only one ipv4 adress
                tableServerAddresses.push({
                    [ifname]: iface.address
                });
            }

            ++alias;
        });
    });

    return tableServerAddresses;
};
