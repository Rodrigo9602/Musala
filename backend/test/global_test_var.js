var gatewayParams = {
    name: 'gateway',
    ipv4: '192.168.117.12',
    devices: [
        {
            vendor: 'Intel',
            status: 'Online'

        },
        {
            vendor: 'AMD',
            status: 'Offline'
        }
    ],
};
var gatewayWithTenDevices = {
    name: 'gateway',
    ipv4: '192.168.117.12',
    devices: [
        {
            vendor: 'Intel',
            status: 'Online'

        },
        {
            vendor: 'Intel',
            status: 'Online'

        },
        {
            vendor: 'Intel',
            status: 'Online'

        },
        {
            vendor: 'Intel',
            status: 'Online'

        },
        {
            vendor: 'Intel',
            status: 'Online'

        },
        {
            vendor: 'Intel',
            status: 'Online'

        },
        {
            vendor: 'Intel',
            status: 'Online'

        },
        {
            vendor: 'Intel',
            status: 'Online'

        },

        {
            vendor: 'AMD',
            status: 'Offline'
        },
        {
            vendor: 'Intel',
            status: 'Online'

        },
    ],
};

 var serial;
 var name;
 var count = 0;
 var UID;

 exports.UID = UID;
 exports.count = count;
 exports.name = name;
 exports.serial = serial;
 exports.gatewayParams = gatewayParams;
 exports.gatewayWithTenDevices = gatewayWithTenDevices;
