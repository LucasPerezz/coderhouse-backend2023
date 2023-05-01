const { program } = require('commander');
const config = require('./config/config');


program
        .option('-d', 'Variable para debug', true)
        .option('-p <port>', 'Puerto del server')
        .option('--mode <mode>', 'Modo de lanzamiento del programa', 'production')

program.parse();

const options = program.opts();


module.exports = options;