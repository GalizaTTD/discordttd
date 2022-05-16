const { MessageEmbed } = require('discord.js');
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
			if (Object.keys(openttd.companyInfo).length === 0) {
				message.reply('`Non hai compañías no xogo.`');
				return;
			}

			// Loop through clients and build info
			const embeds = [];
			for (const COMPANYID in openttd.companyInfo) {
				const COMPANY = openttd.companyInfo[COMPANYID];
				const embed = new MessageEmbed()
					.setTitle(COMPANY.name)
					.setColor(utils.getColourHex(COMPANY.colour))
					.addFields([
						{ name: 'Manager', value: COMPANY.manager, inline: true },
						{ name: 'Fundación', value: COMPANY.startyear, inline: true },
						{
							name: 'Vehículos',
							value: `Trens: ${COMPANY.vehicles.trains} Camións: ${COMPANY.vehicles.lorries} Buses: ${COMPANY.vehicles.busses} Avións: ${COMPANY.vehicles.planes} Barcos: ${COMPANY.vehicles.ships}`,
							inline: false,
						},
						{
							name: 'Estacións',
							value: `Trens: ${COMPANY.stations.trains} Camións: ${COMPANY.stations.lorries} Buses: ${COMPANY.stations.busses} Avións: ${COMPANY.stations.planes} Barcos: ${COMPANY.stations.ships}`,
							inline: false,
						},
					]);
				embeds.push(embed);
			}
			embeds.forEach((embed) => {
				message.channel.send(embed);
			});
		} else {
			message.reply('Non conectado ó servidor');
		}
	},
};
