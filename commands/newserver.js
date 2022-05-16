// Grab OpenTTD helper
const OpenTTD = require('../openttd');

module.exports = {
    name: 'newserver',
    description: 'Configura un novo servidor de OpenTTD nesta canle. Opcionalmente podes indicar o nome, dirección e porto. Por razóns de seguridade a contrasinal de administración tense que engadir no arquivo de configuración.',
    usage: '<[name] [address] [port]>',
    guildOnly: true,
    perm: 'owner',
    execute(message, args) {
        // Check we're not overwriting existing configs
        const openttd = message.client.channelMap.get(message.channel.id);
        if (openttd) {
            message.reply('Esta canle xa ten unha configuración establecida');
            return;
        }

        // Make a channelMapping section if it doesn't exist yet
        if (message.client.config.channelMapping === undefined) {
            message.client.config.channelMapping = {};
        }

        // Create config section with args if given
        const mapConfig = message.client.config.channelMapping[message.channel.id] = {};
        if (args) {
            mapConfig.name = args[0];
            mapConfig.address = args[1];
            mapConfig.port = args[2];
        }

        // Set up a new element in the channel map
        message.client.channelMap.set(message.channel.id, new OpenTTD.Client(mapConfig, message.channel));
        // Add element config to the main config
        const map = message.client.channelMap.get(message.channel.id);

        // Copy elements back to config
        mapConfig.name = map.name;
        mapConfig.address = map.address;
        mapConfig.port = map.port;
        mapConfig.password = map.password;
        mapConfig.autoconnect = map.autoconnect;
        mapConfig.public = map.publicAddress;
        mapConfig.local = map.isLocal;
        mapConfig.savepath = map.savepath;

        global.logger.info(`Configurado novo servidor de OpenTTD nesta canle: ${message.channel.id}`);
        message.reply('Configuración establecida, lembra gardala no arquivo de configuración');
        global.logger.trace('channelMapping:', message.client.config.channelMapping);
    }
};