module.exports = {
    name: 'disconnect',
    description: 'Desconectase do servidor de OpenTTD configurado nesta canle',
    guildOnly: true,
    openttd: true,
    perm: 'admin',
    cooldown: 30,
    execute(message) {
        // Get the OpenTTD server for the channel
        const openttd = message.client.channelMap.get(message.channel.id);

        // Disconnect
        if (openttd.isConnected) {
            return openttd.disconnect();
        } else {
            message.reply('Non conectado ó servidor');
        }
    }
};