class ListComponent {

    listController;

    constructor() {
        if (this.constructor === ListController) {
            throw new Error("Do not create a new ListController directly. Extend ListController in an another class and create that.")
        }
    }

    get list() {
        return this.listController.list;
    }
}