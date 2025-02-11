const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'vehicles',
	description: 'Comproba o total de vehículos que hai actualmente neste servidor de OpenTTD',
	guildOnly: true,
	openttd: true,
	perm: 'player',
    alias: ['vehiculos'],
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

			// Loop through clients and count
			let trains = 0;
			let road = 0;
			let airplanes = 0;
			let ships = 0;
			for (const COMPANYID in openttd.companyInfo) {
				const COMPANY = openttd.companyInfo[COMPANYID];
				trains += COMPANY.vehicles.trains;
				road += COMPANY.vehicles.lorries + COMPANY.vehicles.busses;
				airplanes += COMPANY.vehicles.planes;
				ships += COMPANY.vehicles.ships;
			}
			const embeds = new MessageEmbed()
				.setTitle('Total de Vehículos')
				.setColor(15258703)
				.addFields([
					{ name: 'Trens', value: trains, inline: false },
					{ name: 'Vehículos de estrada', value: road, inline: false },
					{ name: 'Avións', value: airplanes, inline: false },
					{ name: 'Barcos', value: ships, inline: false },
				]);
			message.channel.send(embeds);
		} else {
			message.reply('Non conectado ó servidor');
		}
	},
};
