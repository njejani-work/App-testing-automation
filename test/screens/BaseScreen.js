export const PKG = 'com.saucelabs.mydemoapp.android';           

export const rid = (name) => `id=${PKG}:id/${name}`;             

export default class BaseScreen {                                  
  async waitForScreen(element, timeout = 15000) {
    await element.waitForDisplayed({ timeout });
  }

  async resetApp() {
    await driver.execute('mobile: clearApp', { appId: PKG });
    await driver.activateApp(PKG);
  }

  async hideKeyboard() {
    if (await driver.isKeyboardShown()) {
      await driver.hideKeyboard();
    }
  }
}