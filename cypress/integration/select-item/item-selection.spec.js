
/// <reference types="cypress" />
import LoginBasePage from '../../support/login-page'
import HomeBasePage from '../../support/home-page'


describe('Item Selection', () => {

    before(() => {
        LoginBasePage.open_website()
        LoginBasePage.login_with_valid_password()
    })
        
    it('add an item to shopping cart test', () => {
        HomeBasePage.verify_home_page_appearance()
        HomeBasePage.select_bag_product()
        HomeBasePage.verify_product_page_appearance()
        HomeBasePage.get_initial_cart_items()
        HomeBasePage.verify_product_details()
        HomeBasePage.verify_add_btn_exist_and_click_it()
        HomeBasePage.verify_remove_btn_appearance()
        HomeBasePage.verify_shopping_cart_increased()
    })
})
