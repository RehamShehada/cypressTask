
/// <reference types="cypress" />
import LoginBasePage from '../../support/login-page'
import HomeBasePage from '../../support/home-page'

before(() => {
    LoginBasePage.open_website()
})

describe('login test', () => {
    it('login with invalid password', () => {
        LoginBasePage.login_with_invalid_password()
    })

    it('login with valid password', () => {
        LoginBasePage.login_with_valid_password()
        HomeBasePage.verify_home_page_appearance()
    })
})
