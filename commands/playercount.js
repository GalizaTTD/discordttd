const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'playercount',
    description: 'Comprobando cantos xogadores hai conectados actualmente',
    guildOnly: true,
    openttd: true,
    perm: 'player',
    execute(message) {
        // Get the OpenTTD server for the channel
        const openttd = message.client.channelMap.get(message.channel.id);

        // Check connection
        if (openttd.isConnected) {
            // Get length of client info var for total
            let count = Object.keys(openttd.clientInfo).length;
            let players = 0;
            let spec = 0;

            // If the server is dedciated, minus 1 for the server
            if (openttd.gameInfo.dedicated) {
                count--;
            }

            // Loop through and count players and spectators
            if (count) {
                for (const client in openttd.clientInfo) {
                    // Skip dedicated
                    if (openttd.gameInfo.dedicated && client === '1') {
                        continue;
                    } else {
                        if (openttd.clientInfo[client].company !== '255') {
                            players += 1;
                        } else {
                            spec += 1;
                        }
                    }
                }
            }
			const reply = new MessageEmbed()
			.setTitle(openttd.gameInfo.name)
			.setColor(15258703)
			.addFields([
				{ name: 'Xogadores conectados', value: players, inline: true },
				{ name: 'Espectadores', value: spec, inline: true },
			]);
            message.reply(reply);
        } else {
            message.reply('Non conectado ó servidor');
        }
    }
};