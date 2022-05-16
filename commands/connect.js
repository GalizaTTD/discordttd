module.exports = {
    name: 'connect',
    description: 'Conéctase o servidor de OpenTTD que está configurado nesta canle',
    guildOnly: true,
    openttd: true,
    perm: 'admin',
    cooldown: 30,
    execute(message) {
        // Get the OpenTTD server for the channel
        const openttd = message.client.channelMap.get(message.channel.id);

        // Attempt to connect
        if (openttd.isConnected) {
            return message.reply('Xa conectado ó servidor');
        } else {
            return openttd.connect();
        }
    }
};