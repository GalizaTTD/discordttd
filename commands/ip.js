module.exports = {
    name: 'ip',
    description: 'Devolve a IP do servidor',
    usage: '[ip]',
    execute(message, args) {
        // Get the OpenTTD server for the channel
        const openttd = message.client.channelMap.get(message.channel.id);
		message.reply(`A IP do Servidor "${openttd.name}" é: ${openttd.address}`);
    }
};