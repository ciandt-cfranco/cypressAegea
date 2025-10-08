const { defineConfig } = require('cypress');
const oracledb = require('oracledb');
const dotenv = require('dotenv');

// 1. Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Configure o oracledb para se conectar com sua base de dados
// oracledb.initOracleClient({ libDir: 'C:\\oracle\\instantclient_21_11' }); // Altere o caminho se estiver usando Instant Client

// 2. Define suas credenciais de conexão usando process.env
// As variáveis agora são carregadas do seu arquivo .env
const dbConfigs = {
  piaui: { // Configurações para o Banco de Dados 1
    user: process.env.DB_PIAUI_USER,
    password: process.env.DB_PIAUI_PASSWORD,
    connectString: process.env.DB_PIAUI_CONNECTSTRING
  },
  lagos: { // Configurações para o Banco de Dados 2
    user: process.env.DB_LAGOS_USER,
    password: process.env.DB_LAGOS_PASSWORD,
    connectString: process.env.DB_LAGOS_CONNECTSTRING
  },
  para: { // Configurações para o Banco de Dados 2
    user: process.env.DB_PARA_USER,
    password: process.env.DB_PARA_PASSWORD,
    connectString: process.env.DB_PARA_CONNECTSTRING
  },

};


module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/dbtest/*.cy.js',
    setupNodeEvents(on, config) {
      oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

      // Cria a task que vai executar as queries em diferentes bancos de dados
      on('task', {
        async queryDb({ dbName, query }) {
          const dbConfig = dbConfigs[dbName];
          if (!dbConfig) {
            throw new Error(`Configuração para o banco de dados "${dbName}" não encontrada.`);
          }

          // Adicione uma verificação de credenciais para maior clareza
          if (!dbConfig.user || !dbConfig.password || !dbConfig.connectString) {
             console.error(`Credenciais incompletas para o banco de dados "${dbName}". Verifique seu arquivo .env.`);
             throw new Error(`Credenciais incompletas para o banco de dados "${dbName}".`);
          }

          let connection;
          try {
            // A conexão é feita com as credenciais carregadas do .env
            connection = await oracledb.getConnection(dbConfig);
            const result = await connection.execute(query);
            return result.rows;
          } catch (err) {
            console.error(`Erro ao executar a query no DB "${dbName}":`, err.message || err);
            throw err;
          } finally {
            if (connection) {
              try {
                await connection.close();
              } catch (err) {
                console.error('Erro ao fechar a conexão:', err.message || err);
              }
            }
          }
        },
      });

      // Retorne a configuração do Cypress
      return config;
    },
  },
});