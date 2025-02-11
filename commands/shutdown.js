module.exports = {
    name: 'shutdown',
    description: 'Apaga este bot',
    alias: ['kill'],
    perm: 'owner',
    execute(message) {
        // pm2 existence check
        if (process.env.pm_id) {
            const pm2 = require('pm2');
            global.logger.debug(`Using pm2 to stop ${process.env.name}`);
            pm2.connect(err => {
                if (err) global.logger.error(`Error with pm2 connect: ${err}`);
            });
            pm2.stop(process.env.name, err => {
                if (err) global.logger.error(`Error with pm2 stop: ${err}`);
            });
            pm2.disconnect();
            global.logger.debug('Finished with pm2');
        } else {
            message.client.botShutdown();
        }
    }
};