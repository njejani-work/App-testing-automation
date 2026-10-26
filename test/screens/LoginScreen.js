// import { $ } from '@wdio/globals'
// import Page from './page.js';
import BaseScreen, { rid } from "./BaseScreen.js";

class LoginPage extends BaseScreen {
    
    get usernameField()  { return $(rid('nameET')); }                              
    get passwordField()  { return $(rid('passwordET')); }                          
    get loginButton()    { return $(rid('loginBtn')); }
    
    async waitForLoaded() {
    await this.waitForScreen(this.loginButton);
    }

    async enterUsername(username) {
        await this.usernameField.clearValue();
        if (username) await this.usernameField.setValue(username);
    }

    async enterPassword(password) {
        await this.passwordField.clearValue();
        if (password) await this.passwordField.setValue(password);
    }

    async login(username, password) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.hideKeyboard();          
        await this.loginButton.click();
    }
    }


export default new LoginPage();
