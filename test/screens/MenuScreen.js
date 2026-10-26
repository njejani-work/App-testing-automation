import BaseScreen from "./BaseScreen.js";

class MenuScreen extends BaseScreen {

  get menuButton()   { return $('~View menu'); }                                        
  get loginMenuItem(){ return $('android=new UiScrollable(new UiSelector().scrollable(true))' +
      '.scrollIntoView(new UiSelector().text("Log In"))') }

  async open() {
    await this.menuButton.waitForDisplayed();
    await this.menuButton.click();
  }

  async openLogin() {
    await this.open();
    // await this.loginMenuItem.waitForDisplayed();
    await this.loginMenuItem.click();
  }
}

export default new MenuScreen();