const { Inhibitor } = require('klasa');

module.exports = class extends Inhibitor {

	constructor(...args) {
		super(...args, {
			enabled: true,
			spamProtection: true
		});
	}

	async run(message, command) {
		// secure admin commands, all others don't need permissionLevels
		if (command.permissionLevel >= 9 && !this.client.options.owners.includes(message.author.id)) throw true;
		if (this.client.options.owners.includes(message.author.id)) return;
		// permission nodes don't work in DMs. the runIn inhibitor will deal with them.
		if (!message.guild) return;
		const check = await this.client.permissions.canUse(message, command);
		if (!check) {
			await message.responder.error(`You do not have permission to use this command. You need the \`${command.category.toLowerCase()}.${command.name}\` permission.`);
			throw true;
		}
	}

};
