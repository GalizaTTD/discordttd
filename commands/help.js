module.exports = {
    name: 'help',
    description: 'Obtén unha lista de comandos, ou axuda para un comando',
    usage: '[<command>]',
    alias: ['commands'],
    execute(message, args) {
        let reply;
        // If command was called without arguments give command list
        if (!args.length) {
            global.logger.debug('Give command list');
            reply = `Lista de comandos: ${message.client.commands.map(c => c.name).join(', ')}`;
        } else {
            // Give command help
            const command = message.client.commands.get(args[0].toLowerCase());
            reply = `${message.client.config.prefix}${command.name}`;
            if(command.usage) reply += ` ${command.usage}`;
            if(command.description) reply += `\n${command.description}`;
            if(command.alias) reply += `\nAliases: ${command.alias.join(', ')}`;
        }
        message.reply(reply);
    }
};