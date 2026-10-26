// import { expect } from '@wdio/globals'
import LoginPage from '../screens/LoginScreen.js'
import MenuScreen from '../screens/MenuScreen.js'
import CatalogueScreen from '../screens/CatalogueScreen.js'
import { users } from '../data/users.js'

describe('Login', () => {

    beforeEach(async () => {
    await LoginPage.resetApp();
    await MenuScreen.openLogin();
    await LoginPage.waitForLoaded();
    });

    it('TC_01 should login with valid credentials', async () => {

        await LoginPage.login(users.valid.username, users.valid.password)
        await CatalogueScreen.waitForLoaded();
        await expect(CatalogueScreen.title).toBeDisplayed();
        await expect(LoginPage.loginButton).not.toBeDisplayed();
    })
})

