import popup from 'mo/popup';
import BasePage from 'mo/pages/Base';

module.exports = class extends BasePage {
    constructor(name, viewClass) {
        const viewEvents = {
            buttonclick: (e, {user}) => popup.show(`Hello, ${user}!`)
        };

        super(name, viewClass, viewEvents);

        this.view.update({hello: 'Welcome to mo!'});
    }

    // Hooks go here.
    
    onBeforeShow() {
    }

    onShow() {
    }

    onBeforeHide() {
    }

    onHide() {
    }
};