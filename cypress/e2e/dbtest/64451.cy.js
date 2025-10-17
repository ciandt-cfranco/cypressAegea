describe('Nova estrutura de dados para Emissão de 1ª via de carnê ', () => {

    let db = 'piaui';
  it('Deve validar a estrutura de dados a nível de carnê', () => {
    // 1. Defina a query SQL para buscar o cliente
    // Use aspas duplas para o nome da tabela/coluna se estiver em maiúsculo
    const sqlQuery = `SELECT * FROM PIAUIWEB.CARNE`;
   
    // 2. Chame a nova task 'queryOracle' para executar a query
    // O nome da task agora é 'queryOracle'
    cy.task('queryDb', { dbName: db, query: sqlQuery }).then((result) => {
      // 3. Verifique se o resultado não está vazio e se tem 1 linha
      expect(result).to.have.lengthOf(1);

      // 4. Acesse o primeiro (e único) registro
      const carne = result[0];

 
      // teste de contrato
      expect(typeof carne.SEQ_CARNE).to.equal('number');
      expect(typeof carne.ZONA_LIGACAO).to.equal('number');
      expect(typeof carne.NUM_LIGACAO).to.equal('number');
      expect(typeof carne.SEQ_RESPONSAVEL).to.equal('number');
      expect(typeof carne.REF_INICIAL).to.equal('string');
      expect(typeof carne.REF_FINAL).to.equal('string');
      expect(typeof carne.DAT_EMISSAO).to.equal('date');
      expect(typeof carne.SEQ_CARNE_LOTE).to.equal('number');
      expect(typeof carne.VAL_DESC_APLICADO).to.equal('number');
      expect(typeof carne.STA_FOLHA_ROSTO).to.equal('string');
      expect(typeof carne.STA_DESCONTO).to.equal('string');
      expect(typeof carne.NUM_EXTRATO).to.equal('number');
      expect(typeof carne.ANO_EXTRATO).to.equal('number');
      expect(typeof carne.SIT_CARNE).to.equal('string');
      expect(typeof carne.NOM_ARQUIVO).to.equal('string');

    });
  });



  

});
