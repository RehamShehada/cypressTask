/// <reference types="cypress"/>

const TIMEOUT = 30000

const LOCATORS = {
    bagProduct: '#item_4_title_link > .inventory_item_name',
    appLogo: '.app_logo',
    backToHomePage: '[data-test="back-to-products"]',
    productImage: '.inventory_details_img',
    productName: '.inventory_details_name',
    productDescription: '.inventory_details_desc',
    productPrice: '.inventory_details_price',
    addToCartBtn: '[data-test="add-to-cart-sauce-labs-backpack"]',
    shoppingCartIcon: '.shopping_cart_link',
    removeBtn: '[data-test="remove-sauce-labs-backpack"]',
    cartBadge: '.shopping_cart_badge'

}

export default class HomeBasePage{

    /**
     * This method to verify user is navigated to home page
     */
    static verify_home_page_appearance (){
        verify_element_visibility(LOCATORS.appLogo)
    }

    /**
     * This method to select a product
     */
    static select_bag_product (){
        verify_btn_exist_and_click_it(LOCATORS.bagProduct)
    }

    /**
     * This function to check if user is navigated to the selected product page
     */
    static verify_product_page_appearance (){
        verify_element_visibility(LOCATORS.backToHomePage)
    }

    /**
     * This method to verify all selected product's details are shown
     */
    static verify_product_details (){
        verify_element_visibility(LOCATORS.productImage)
        verify_element_visibility(LOCATORS.productName)
        verify_element_visibility(LOCATORS.productDescription)
        verify_element_visibility(LOCATORS.productPrice)
    }
    
    /**
     * This method to check if add to cart button is displayed, then click on it
     */
    static verify_add_btn_exist_and_click_it (){
        verify_btn_exist_and_click_it(LOCATORS.addToCartBtn)
    }

    /**
     * This method to check if remove button is displayed, then click on it
     */
    static verify_remove_btn_appearance (){
        verify_element_visibility(LOCATORS.removeBtn)
    }

    /**
     * This method to veirfy it the number of items added to shopping cart are increased 
     */
    static verify_shopping_cart_increased (){
        let itemsCount
        let initialCount
        cy.get('@initItemsCount').then((value) => {
            initialCount = value
            cy.get(LOCATORS.shoppingCartIcon).find(LOCATORS.cartBadge).should('be.exist')
            .invoke('text')
            .then((value) => {
                itemsCount = (value.match(/\d+/))[0]
                assert.isTrue(itemsCount == initialCount+1, 'Items  test added to shopping cart were increased by one')
            })
        })
    }

    /**
     * This method to get the initial number of items added to shopping cart 
     */
    static get_initial_cart_items (){
        let initItemsCount = 0
        cy.get('body', { timeout: TIMEOUT }).within(($body) => {
            if ($body.find(LOCATORS.cartBadge, { timeout: TIMEOUT }).length > 0) {
                cy.invoke('text')
                .then((value) => {
                    initItemsCount = (value.match(/\d+/))[0]
                })
            } else {
                cy.wrap(initItemsCount).as('initItemsCount')
            }
        })
    }
}

/**
 * This method to verify an element is exist and click on it
 * @param {*} locator 
 */
const verify_btn_exist_and_click_it = (locator) => {
    cy
    .get(locator, {timeout : TIMEOUT})
    .should('be.visible')
    .click()
}

/**
 * This method to veify if an element is displayed 
 * @param {*} locator 
 */
const verify_element_visibility = (locator) => {
    cy
    .get(locator,{ timeout: TIMEOUT })
    .should('be.visible')
}