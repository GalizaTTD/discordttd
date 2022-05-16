module.exports = {
    name: 'save',
    description: 'Garda a configuración actual',    
    perm: 'owner',
    execute(message) {
        global.logger.info('Saving config');
        message.client.saveBotConfig(message.client.config)
            .then(result => {
                if (result === 'OK') {
                    global.logger.info('Config saved');
                    message.reply('Configuración gardada');
                } else {
                    global.logger.error(`There was an error writing the config:\n${result}`);
                    message.reply('Houbo un erro no gardado, comproba os logs para máis detalles');
                }
            });
    }
};