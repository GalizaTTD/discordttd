const { MessageEmbed } = require('discord.js');
const openttdUtils = require('../openttd/utils');

module.exports = {
	name: 'info',
	description: 'Obtén algunha información básica do servidor de OpenTTD',
	guildOnly: true,
	openttd: true,
	perm: 'player',
	execute(message) {
		// Get the OpenTTD server for the channel
		const openttd = message.client.channelMap.get(message.channel.id);

		// Check connection
		if (openttd.isConnected) {
			const NAME = `Name: ${openttd.gameInfo.name}`;
			const VERSION = `Version: ${openttd.gameInfo.version}`;
			let TYPE;
			if (openttd.gameInfo.dedicated) {
				TYPE = 'Type: Dedicated';
			} else {
				TYPE = 'Type: Listen';
			}
			const STARTDATE = `Start Date: ${openttdUtils.convertOpenttdDate(openttd.gameInfo.map.startdate).format('DD MMM YYYY')}`;
			const CURDATE = `Current Date: ${openttdUtils.convertOpenttdDate(openttd.gameDate).format('DD MMM YYYY')}`;
			const SIZE = `Size: ${openttd.gameInfo.map.mapheight}x${openttd.gameInfo.map.mapwidth}`;
			const LANDSCAPE = `Landscape: ${openttdUtils.getLandscapeName(openttd.gameInfo.map.landscape)}`;
			const ADDRESS = `Address: ${openttd.publicAddress}`;

			const reply = `${NAME} ${VERSION} ${ADDRESS} ${TYPE} ${STARTDATE} ${CURDATE} ${LANDSCAPE} ${SIZE}`;

			const embeds = new MessageEmbed()
				.setTitle(openttd.gameInfo.name)
				.setColor(15258703)
				.addFields([
					{ name: 'Xogadores online', value: `${Object.keys(openttd.clientInfo).length-1}/255`, inline: true },
					{ name: 'Tamaño do mapa', value: `${openttd.gameInfo.map.mapheight}x${openttd.gameInfo.map.mapwidth}`, inline: true },
					{ name: 'Data de inicio', value: openttdUtils.convertOpenttdDate(openttd.gameInfo.map.startdate).format('YYYY-MM-DD'), inline: true },
					{ name: 'Compañias', value: `${Object.keys(openttd.companyInfo).length}/15`, inline: true },
					{ name: 'Versión do xogo', value: openttd.gameInfo.version, inline: true },
					{ name: 'Data actual', value: openttdUtils.convertOpenttdDate(openttd.gameDate).format('YYYY-MM-DD'), inline: true },
					{ name: 'IP do Servidor', value: openttd.address, inline: false },
				]);
			message.channel.send(embeds);
		} else {
			message.reply('Non conectado ó servidor');
		}
	},
};
