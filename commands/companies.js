const utils = require('../openttd/utils');

module.exports = {
    name: 'companies',
    description: 'Obten información das compañías que hai actualmente no servidor',
    guildOnly: true,
    openttd: true,
    perm: 'player',
    execute(message) {
        // Get the OpenTTD server for the channel
        const openttd = message.client.channelMap.get(message.channel.id);

        // Check connection
        if (openttd.isConnected) {
            // If there aren't any companies yet, reply and stop
            if(Object.keys(openttd.companyInfo).length === 0) {
                message.reply('`Non hai compañías no xogo.`');
                return;
            } 

            // Loop through clients and build info
            const companies = [];
            for (const COMPANYID in openttd.companyInfo) {
                const COMPANY = openttd.companyInfo[COMPANYID];
                let text = `Compañía ${parseInt(COMPANYID)+1}`;
                if (COMPANYID.isai) {
                    text += ' (IA)';
                }
                text += `: ${COMPANY.name} (${utils.getColourName(COMPANY.colour)})`;
                text += `\nManager: ${COMPANY.manager} Fundación: ${COMPANY.startyear}`;
                text += `\nVehículos: Trens: ${COMPANY.vehicles.trains} Camións: ${COMPANY.vehicles.lorries} Buses: ${COMPANY.vehicles.busses} Avións: ${COMPANY.vehicles.planes} Barcos: ${COMPANY.vehicles.ships}`;
                text += `\nEstacións: Trens: ${COMPANY.stations.trains} Camións: ${COMPANY.stations.lorries} Buses: ${COMPANY.stations.busses} Avións: ${COMPANY.stations.planes} Barcos: ${COMPANY.stations.ships}`;
                companies.push(text);
            }

            // Build the reply
            companies.forEach((reply) => {
                message.channel.send(`\`${reply}\``);
            });
        } else {
            message.reply('Non conectado ó servidor');
        }
    }
};