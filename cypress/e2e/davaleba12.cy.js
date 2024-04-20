describe('My First Test', () => {
  it('Does not do much!', () => {
    // რეგისტრაცია
    cy.viewport(1920, 1080);
    cy.visit('https://automationteststore.com/')
    cy.wait(1000)
    cy.visit('https://automationteststore.com/index.php?rt=account/login')
    cy.get('#accountFrm > fieldset > .btn').click()
    cy.get('#AccountFrm_firstname').focus().type(rand.text(10))
    cy.get('#AccountFrm_lastname').focus().type(rand.text(10))
    cy.get('#AccountFrm_email').focus().type(`${rand.text(10)}@gmail.com`)
    cy.get('#AccountFrm_telephone').focus().type(rand.number(1000000, 100000000))
    cy.get('#AccountFrm_country_id').select('Brunei Darussalam') 
    cy.get('#AccountFrm_address_1').focus().type(rand.text(10))
    cy.get('#AccountFrm_city').focus().type(rand.text(10))
    cy.get('#AccountFrm_zone_id').select('Belait') 
    cy.get('#AccountFrm_postcode').focus().type(rand.number(1000, 9999))
    const user = rand.text(10)
    cy.get('#AccountFrm_loginname').focus().type(user)
    const password = rand.text(10)
    cy.get('#AccountFrm_password').focus().type(password)
    cy.get('#AccountFrm_confirm').focus().type(password)
    cy.get('#AccountFrm_newsletter0').first().check()
    cy.get('#AccountFrm_agree').first().check()
    cy.get('#AccountFrm').submit()
    cy.screenshot()
    // გადასვლა ედიტის გვერდზე
    cy.visit('https://automationteststore.com/index.php?rt=account/edit')

    const change = rand.text(10)
    cy.get('#AccountFrm_firstname').focus().clear().type(change)
    cy.get('#AccountFrm').submit()
    cy.screenshot()

    cy.visit('https://automationteststore.com/index.php?rt=account/edit')

    cy.get('#AccountFrm_firstname').should('have.value', change);

    cy.wait(500)

    cy.visit('https://automationteststore.com/index.php?rt=account/password')

    cy.get('#PasswordFrm_current_password').type(password)
    const newpassword = rand.text(10)

    cy.get('#PasswordFrm_password').type(newpassword)
    cy.get('#PasswordFrm_confirm').type(newpassword)
    cy.get('#PasswordFrm').submit()
    cy.get('.alert').should('be.visible')
    cy.wait(500)
    cy.visit('https://automationteststore.com/index.php?rt=account/address')
    
    cy.get('tr > .pull-right > .btn').click()

    cy.get('#AddressFrm_address_1').clear().type(rand.text(10))
    cy.get('#AddressFrm').submit();

    cy.get('.alert').should('be.visible')
  })
})


var rand = {
    number: (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    text: (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}
