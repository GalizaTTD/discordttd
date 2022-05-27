const openttdUtils = require('../openttd/utils');

module.exports = {
    name: 'date',
    description: 'Consulta a data actual dentro do xogo',
    guildOnly: true,
    openttd: true,
    perm: 'player',
    alias: ['data'],
    execute(message) {
        // Get the OpenTTD server for the channel
        const openttd = message.client.channelMap.get(message.channel.id);

        // Check connection
        if (openttd.isConnected) {
            const DATE = `Data Actual de GalizaTTD: ${openttdUtils.convertOpenttdDate(openttd.gameDate).format('DD MMM YYYY')}`;
            message.reply(`\`${DATE}\``);
        } else {
            message.reply('Non conectado ó servidor');
        }
    }
};