import BasePage from 'mo/pages/Base';

class {{PageName}} extends BasePage {
    constructor(name, viewClass) {
        super(name, viewClass, {
            // View events go here.
        });
    }

    // Hooks go here.

    onBeforeShow() {
        // this.view.update(state);
    }

    onShow() {
    }

    onBeforeHide() {
    }

    onHide() {
    }
}

// Change to 'blank' to disable menu.
{{PageName}}.LAYOUT = 'main';

// Change to 'dark' for white controls.
{{PageName}}.SKIN = 'light';

// ES5 compatibility.
module.exports = {{PageName}};
