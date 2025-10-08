describe('Validação de dados do cliente no banco de dados Oracle', () => {

    let db = 'piaui';
  it('Deve validar os campos de um cliente na tabela KEY_VALUES STA_EMISSAO_CARNE', () => {
    // 1. Defina a query SQL para buscar o cliente
    // Use aspas duplas para o nome da tabela/coluna se estiver em maiúsculo
    const sqlQuery = `SELECT ID, "KEY", VALUE, COMMENTS FROM PIAUIWEB.KEY_VALUES WHERE "KEY" = 'STA_EMISSAO_CARNE'`;
   
    // 2. Chame a nova task 'queryOracle' para executar a query
    // O nome da task agora é 'queryOracle'
    cy.task('queryDb', { dbName: db, query: sqlQuery }).then((result) => {
      // 3. Verifique se o resultado não está vazio e se tem 1 linha
      expect(result).to.have.lengthOf(1);

      // 4. Acesse o primeiro (e único) registro
      const cliente = result[0];

      expect(cliente.KEY).to.equal('STA_EMISSAO_CARNE');
      expect(cliente.VALUE).to.equal('S');

      
      // teste de contrato
      expect(typeof cliente.ID).to.equal('number');
      expect(typeof cliente.KEY).to.equal('string');
      expect(typeof cliente.VALUE).to.equal('string');
      expect(typeof cliente.COMMENTS).to.equal('string');
    });
  });

  it('Deve validar os campos de um cliente na tabela CARNE_PARAMETRO', () => {
    // 1. Defina a query SQL para buscar o cliente
    // Use aspas duplas para o nome da tabela/coluna se estiver em maiúsculo
    const sqlQuery = `SELECT * FROM PIAUIWEB.CARNE_PARAMETRO`;
  
    // 2. Chame a nova task 'queryOracle' para executar a query
    // O nome da task agora é 'queryOracle'
    cy.task('queryDb', { dbName: db, query: sqlQuery }).then((result) => {
      // 3. Verifique se o resultado não está vazio e se tem 1 linha
      expect(result).to.have.lengthOf(1);

      // 4. Acesse o primeiro (e único) registro
      const cliente = result[0];

    

      expect(cliente.QTD_PRAZO_ELEGIBILIDADE).to.equal(33);
      expect(cliente.DIA_VENCTO).to.equal(20);
      expect(cliente.PER_DESCONTO).to.equal(9);
      expect(cliente.QTD_PRAZO_LEITURA).to.equal(23);
      expect(cliente.TPO_LEITURA).to.equal(1);

      // teste de contrato
      expect(typeof cliente.QTD_PRAZO_ELEGIBILIDADE).to.equal('number');
      expect(typeof cliente.DIA_VENCTO).to.equal('number');
      expect(typeof cliente.PER_DESCONTO).to.equal('number');
      expect(typeof cliente.QTD_PRAZO_LEITURA).to.equal('number');
      expect(typeof cliente.TPO_LEITURA).to.equal('number');
    });
  });

  it('Deve validar os campos de um cliente na tabela CARNE_PARAMETRO_COMPLEMENTO', () => {
    // 1. Defina a query SQL para buscar o cliente
    // Use aspas duplas para o nome da tabela/coluna se estiver em maiúsculo
    const sqlQuery = `SELECT * FROM PIAUIWEB.CARNE_PARAMETRO_COMPLEMENTO`;

    // 2. Chame a nova task 'queryOracle' para executar a query
    // O nome da task agora é 'queryOracle'
    cy.task('queryDb', { dbName: db, query: sqlQuery }).then((result) => {
      // 3. Verifique se o resultado não está vazio e se tem 1 linha
      //expect(result).to.have.lengthOf(0);
     
      // 4. Acesse o primeiro (e único) registro
      const cliente = result[0];

      
      // teste de contrato
       expect(typeof cliente.SEQ_CARNE_COMPLEMENTO).to.equal('number');
       expect(typeof cliente.TPO_PARAMETRO).to.equal('number');
       expect(typeof cliente.COD_GRUPO).to.equal('number');
       //expect(typeof cliente.ZONA_LIGACAO).to.equal('number');
       expect(typeof cliente.DSC_VALOR).to.equal('string');
    });
  });

  it('Deve validar os campos de um cliente na tabela CARNE_LIGACAO', () => {
    // 1. Defina a query SQL para buscar o cliente
    // Use aspas duplas para o nome da tabela/coluna se estiver em maiúsculo
    const sqlQuery = `SELECT * FROM PIAUIWEB.CARNE_LIGACAO`;

    // 2. Chame a nova task 'queryOracle' para executar a query
    // O nome da task agora é 'queryOracle'
    cy.task('queryDb', { dbName: db, query: sqlQuery }).then((result) => {
      // 3. Verifique se o resultado não está vazio e se tem 1 linha
      expect(result).to.have.lengthOf(0);
      console.log(JSON.stringify(result));
      // 4. Acesse o primeiro (e único) registro
      const cliente = result[0];
      if (cliente != null){
      
        // teste de contrato
       expect(typeof cliente.NUM_LIGACAO).to.equal('number');
       expect(typeof cliente.ZONA_LIGACAO).to.equal('number');
       expect(typeof cliente.STA_ATIVO).to.equal('string');
      
      }
      
    });
  });

  it('Deve validar os campos de um cliente na tabela CARNE_LIGACAO', () => {
    // 1. Defina a query SQL para buscar o cliente
    // Use aspas duplas para o nome da tabela/coluna se estiver em maiúsculo
    const sqlQuery = `
    SELECT COUNT(*)
    FROM ALL_OBJECTS
    WHERE OBJECT_NAME = 'PIAUIWEB.CARNE_LIGACAO'
    AND OBJECT_TYPE = 'TABLE'
  `;

    // 2. Chame a nova task 'queryOracle' para executar a query
    // O nome da task agora é 'queryOracle'
    cy.task('queryDb', { dbName: db, query: sqlQuery }).then((result) => {
      // 3. Verifique se o resultado não está vazio e se tem 1 linha
      expect(result).to.have.lengthOf(1);
      console.log(JSON.stringify(result));
      // 4. Acesse o primeiro (e único) registro
     
      
    });
  });

  

});
