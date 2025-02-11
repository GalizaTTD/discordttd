module.exports = {
    name: 'players',
    description: 'Get player info for the current OpenTTD server\'s game',
    guildOnly: true,
    openttd: true,
    perm: 'player',
    alias: ['clients'],
    execute(message) {
        // Get the OpenTTD server for the channel
        const openttd = message.client.channelMap.get(message.channel.id);

        // Check connection
        if (openttd.isConnected) {
            let reply;
            // If there are no clients, reply and stop
            let count = Object.keys(openttd.clientInfo).length;
            if (openttd.gameInfo.dedicated) count -= 1;
            if(count === 0) {
                reply = 'No players connected.';
                message.reply(`\`${reply}\``);
                return;
            } 
            const PLAYERS = [];
            const SPECTATORS = [];

            // Loop through clients and build info
            for (const CLIENTID in openttd.clientInfo) {
                // Skip dedicated
                if (openttd.gameInfo.dedicated && CLIENTID === '1') {
                    continue;
                } else {
                    if (openttd.clientInfo[CLIENTID].company !== 255) {
                        // Add info for player
                        const COMPANYID = openttd.clientInfo[CLIENTID].company;
                        PLAYERS.push(`Client ${CLIENTID}: ${openttd.clientInfo[CLIENTID].name} in Company ${COMPANYID+1} (${openttd.companyInfo[COMPANYID].name})`);
                    } else {
                        // Add spectator
                        SPECTATORS.push(`Client ${CLIENTID}: ${openttd.clientInfo[CLIENTID].name}`);
                    }
                }
            }

            // Build the reply
            reply = [];
            if (PLAYERS.length) {
                reply.push(`${PLAYERS.join(', ')}`);
            }
            if (SPECTATORS.length) {
                reply.push(`Spectators: ${SPECTATORS.join(', ')}`);
            }
            reply = reply.join('\n');
            message.reply(`\`${reply}\``);
        } else {
            message.reply('Non conectado ó servidor');
        }
    }
};