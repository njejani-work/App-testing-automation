import BaseScreen, { rid } from "./BaseScreen.js";

class CatalogueScreen extends BaseScreen {

  get title() { return $(rid('productTV')); }

  async waitForLoaded() {
    await this.waitForScreen(this.title);
  }
}

export default new CatalogueScreen();