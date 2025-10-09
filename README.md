Como configurar seu código para Oracle
O Cypress não tem um adaptador nativo para Oracle. Para se conectar, você precisará usar uma biblioteca Node.js específica para Oracle em conjunto com o Cypress, como oracledb. A ideia é criar uma "task" customizada no arquivo cypress.config.js que utilize essa biblioteca para executar a query.
Aqui está um passo a passo de como você pode melhorar seu código para se conectar a um banco de dados Oracle.

Passo 1: Instale a biblioteca oracledb
Você precisa instalar o oracledb em seu projeto. Abra o terminal e execute o seguinte comando:
Bash


npm install oracledb
Passo 2: Configure a conexão no cypress.config.js
Você deve criar uma task personalizada que recebe uma query SQL e a executa no banco de dados Oracle.
No arquivo cypress.config.js (ou cypress.json se for uma versão mais antiga), adicione a seguinte configuração:
JavaScript


const { defineConfig } = require('cypress');
const oracledb = require('oracledb');

// Configure o oracledb para se conectar com sua base de dados
oracledb.initOracleClient({ libDir: 'C:\\oracle\\instantclient_21_11' }); // Altere o caminho para o seu Instant Client

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        async queryOracle(sqlQuery) {
          let connection;
          try {
            // Defina suas credenciais de conexão aqui
            const dbConfig = {
              user: 'seu_usuario',
              password: 'sua_senha',
              connectString: 'seu_host:seu_porta/seu_servico' // Ex: localhost:1521/XEPDB1
            };
            connection = await oracledb.getConnection(dbConfig);
            const result = await connection.execute(sqlQuery);
            // Retorna o resultado como um array de objetos para fácil leitura
            const rowsAsObjects = result.rows.map(row => {
              const obj = {};
              result.metaData.forEach((column, index) => {
                obj[column.name] = row[index];
              });
              return obj;
            });
            return rowsAsObjects;
          } catch (err) {
            console.error('Erro na query Oracle:', err);
            throw err;
          } finally {
            if (connection) {
              try {
                await connection.close();
              } catch (err) {
                console.error(err);
              }
            }
          }
        },
      });
    },
  },
});
Atenção: Certifique-se de substituir seu_usuario, sua_senha e seu_host:seu_porta/seu_servico pelas suas credenciais reais. O connectString pode variar dependendo da sua configuração de TNS.

Passo 3: Adaptar seu código de teste Cypress
Agora que você tem a task queryOracle, pode adaptar seu teste para usá-la. A estrutura do seu teste é muito boa e não precisa de grandes mudanças.
JavaScript


describe('Validação de dados do cliente no banco de dados Oracle', () => {

    it('Deve validar os campos de um cliente na tabela KEY_VALUES', () => {
      // 1. Defina a query SQL para buscar o cliente
      // Use aspas duplas para o nome da tabela/coluna se estiver em maiúsculo
      const sqlQuery = `SELECT ID, "KEY", VALUE, COMMENTS
FROM PIAUIWEB.KEY_VALUES WHERE "KEY" = 'STA_EMISSAO_CARNE'`;
  
      // 2. Chame a nova task 'queryOracle' para executar a query
      // O nome da task agora é 'queryOracle'
      cy.task('queryOracle', sqlQuery).then((result) => {
        // 3. Verifique se o resultado não está vazio e se tem 1 linha
        expect(result).to.have.lengthOf(1);
  
        // 4. Acesse o primeiro (e único) registro
        const cliente = result[0];
  
        // 5. Faça as validações (assertions) nos campos
        expect(cliente.KEY).to.equal('STA_EMISSAO_CARNE');
        expect(cliente.VALUE).to.equal('N');
  
        // Se você quiser validar outros campos ou o formato do dado:
        // expect(typeof cliente.ID).to.equal('number');
      });
    });
  
  });
O que foi melhorado?
Conexão direta com Oracle: A task agora usa a biblioteca oracledb, que é o driver oficial da Oracle para Node.js, garantindo uma conexão segura e eficiente.

Reuso e modularidade: Ao criar uma task no cypress.config.js, você centraliza a lógica de conexão com o banco de dados. Isso significa que você pode usar a mesma task em múltiplos arquivos de teste sem ter que reescrever a lógica de conexão.

Gerenciamento de recursos: O código da task utiliza try...catch...finally para garantir que a conexão com o banco de dados seja sempre fechada, mesmo que ocorra um erro. Isso é crucial para evitar o vazamento de conexões, que pode causar problemas de performance e estabilidade.

Manutenção simplificada: Se as credenciais do banco de dados mudarem, você só precisa atualizá-las em um único lugar (cypress.config.js), em vez de em todos os seus arquivos de teste.

Link do repositório CypressDBOracle 
