/// <reference types="cypress"/>

const TIMEOUT = 30000

const LOCATORS = {
    username: '[data-test="username"]',
    password: '[data-test="password"]',
    loginBtn: '[data-test="login-button"]',
    loginErrorMsg: '[data-test="error"]',
    loginPageLogo: '.login_logo'
}

export default class LoginBasePage{

    /**
     * This function to include login test case with invalid password
     */
    static login_with_invalid_password (){
        verify_login_page_appearance()
        fill_login_credintials_with_invalid_credintials()
        verify_login_btn_exist_and_click()
        verify_invalid_login_msg_appearance()
        cy.window().then((win) => {
            win.sessionStorage.clear()
        });
    }

    /**
     * This function to include login test case with valid credintials
     */
    static login_with_valid_password (){
        verify_login_page_appearance()
        login_with_invalid_credintials()
        verify_login_btn_exist_and_click() 
    }

    /**
    * This method to open the required website
    */
    static open_website() {
        cy.visit('https://www.saucedemo.com/')
    }
}

/**
 * This method to verify if user is navigated to login page
 */
const verify_login_page_appearance = () => {
    verify_element_visibility(LOCATORS.loginPageLogo)
    verify_element_visibility(LOCATORS.username)
    verify_element_visibility(LOCATORS.password)
}

/**
 * This method to wrtie login credintials with invalid password
 */
const fill_login_credintials_with_invalid_credintials = () => {
    write_credintials(LOCATORS.username,'standarduser')
    write_credintials(LOCATORS.password,'12345')
}

/**
 * This method to check if login button is exist then click on it
 */
const verify_login_btn_exist_and_click = () => {
    cy
    .get(LOCATORS.loginBtn, {timeout : TIMEOUT})
    .should('be.visible')
    .click()
}

/**
 * This metho to verify that validation error message will be shown for invalid login
 */
const verify_invalid_login_msg_appearance = () => {
    verify_element_visibility(LOCATORS.loginErrorMsg)
}

/**
 * This method to wrtie correct password as login credintials
 */
const login_with_invalid_credintials = () => {
    write_credintials(LOCATORS.username,'standard_user')
    write_credintials(LOCATORS.password,'secret_sauce')
}

/**
 * This method to veify if an element is displayed 
 * @param {*} locator 
 */
const verify_element_visibility = (locator) => {
    cy.get(locator,{ timeout: TIMEOUT })
    .should('be.visible')
}

/**
 * This method to write login credintials
 * @param {*} locator 
 * @param {*} value 
 */
const write_credintials = (locator, value) => {
    cy.get(locator,{ timeout: TIMEOUT })
    .clear()
    .type(value)
}