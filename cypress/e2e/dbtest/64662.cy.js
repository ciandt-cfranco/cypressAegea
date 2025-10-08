describe('Validação de existencia da view em piaui', () => {

   // SQL query to check if the view exists in ALL_OBJECTS
   const sqlQuery = `
   SELECT COUNT(*)
   FROM ALL_OBJECTS
   WHERE OBJECT_NAME = 'VEW_CARNE_ELEGIBILIDADE'
   AND OBJECT_TYPE = 'VIEW'
 `;

  it('Verificar na base se a view vew_carne_elegibilidade foi criada em Piaui', () => {
     
      cy.task('queryDb', { dbName: 'piaui', query: sqlQuery }).then(result => {
        expect(result).to.have.length(1);
        
        const resultado = result[0];
       // console.log*(resultado);
       // expect(resultado).to.equal(1);

      });

     
  });

  it('Verificar na base se a view vew_carne_elegibilidade foi criada em Pará', () => {
     
    cy.task('queryDb', { dbName: 'para', query: sqlQuery }).then(result => {
      expect(result).to.have.length(1);
      
      //const resultado = result[0];
      //expect(resultado).to.equal(1);

    });

   
});
  
  });
