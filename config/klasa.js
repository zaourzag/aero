const { host, port } = require('./mongodb');
const { prefix, devPrefix, production } = require('./aero');

const { NODE_ENV, MONGO_USER: user, MONGO_PASS: pass } = process.env;

module.exports = {
	commandEditing: true,
	commandLogging: true,
	console: { useColor: true },
	consoleEvents: {
		debug: !production,
		verbose: !production
	},
	createPiecesFolders: false,
	disabledCorePieces: ['providers'],
	owners: config.owners,
	prefix: production ? prefix : devPrefix,
	providers: {
		default: 'mongodb',
		mongodb: {
			connectionString: `mongodb://${user}:${pass}@${host}:${port}/`,
			db: `aero${production ? '' : '-dev'}`
		}
	},
	typing: true
}