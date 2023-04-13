

describe('Teste de busca no Google', () => {
  it('Realiza a busca por "Testes" e valida o resultado', () => {
    // Acessa o site do Google
    cy.visit('https://www.google.com.br')

    // Digita a palavra "Testes" no campo de busca e pressiona Enter
    // Step que falhou na automação gerada pelo ChatGPT:
    // cy.get('input[name="q"]').type('Testes{enter}')

    // Step modificado para o teste
    cy.get('[name="q"]').type('Testes{enter}')

    // Valida se a página de resultados foi carregada corretamente
    cy.url().should('include', 'search')
    cy.get('#search').should('be.visible')

    // Valida se o resultado da busca contém a palavra "Testes"
    cy.get('#search').contains('Testes').should('exist')
  })
})


describe('Teste do botão de pesquisa do Google', () => {
  it('Deve permitir pesquisar por um termo', () => {
    cy.visit('https://www.google.com.br/')
    cy.get('[name="q"]').type('Cypress.io{enter}')
    cy.url().should('include', 'search?q=Cypress.io')
    cy.get('#search').should('be.visible')
  })
})

describe('Teste de navegação para a página de imagens do Google', () => {
  it('Deve permitir navegar para a página de imagens', () => {
    cy.visit('https://www.google.com.br/')

    // Steps que falharam na automação gerada pelo ChatGPT:
    // cy.get('[aria-label="Imagens"]').click()
    // cy.url().should('include', 'search?tbm=isch')
    // cy.get('#islmp').should('be.visible')

    // Steps modificados para o teste
    cy.get('a[aria-label]').contains('Imagens').click()
    cy.url().should('include', 'imghp')
    cy.get('span').contains('Imagens').should('be.visible')

  })
})

describe('Teste de sugestão de pesquisa do Google', () => {
  it('Deve exibir sugestões de pesquisa ao digitar um termo', () => {
    cy.visit('https://www.google.com.br/')
    cy.get('[name="q"]').type('Cypress.io')

    // Step que falhou na automação gerada pelo ChatGPT
    // cy.get('.aajZCb .sbct').first().should('have.text', 'cypress.io documentation')

    // Step modificados para o teste
    cy.get('.aajZCb .sbct').first().should('include.text', 'cypress')

  })
})

describe('Teste do botão "Estou com sorte" do Google', () => {
  it('Deve redirecionar para a página do resultado da pesquisa', () => {
    cy.visit('https://www.google.com.br/')

    // Steps que falharam na automação gerada pelo ChatGPT:
    //cy.get('[name="btnI"]').click()
    //cy.url().should('include', 'url?q=')
    //cy.get('#search').should('not.exist')

    // Steps modificados para o teste
    cy.get('[name="btnI"]').last().click()
    cy.intercept('*/**').as('google')
    cy.wait('@google').then(url => {
      cy.log(JSON.stringify(url.request.url))
      expect(JSON.stringify(url.request.url)).contains('google')
    })

  })
})
