class ListController {

    list;       // this is the list of items
    results;    // this is what was returned from the api ( with count, next, prev, etc )
    url;        // this points to the api endpoint
    params;     // this holds all the filter and sorting parameters

    listeners = []   // holds a reference to all components that need to be notified of a change


    constructor() {
        if (this.constructor === ListController) {
            throw new Error("Do not create a new ListController directly. Extend ListController in an another class and create that.")
        }
    }

    paramsChanged(newParams) {
        throw new Error("you have to implement this in the child class. It should return ")

        // this should return a Promise that returns the api data from a list endpoint
        //
        //  {
        //      count: number,
        //      next: url,
        //      previous: url,
        //      results: Array<items>
        //  }

        return fetch(url, params).then(res => res.json())
    }

    addEventListener(eventString: string, callback): void {
        this.listeners.push({term: eventString, callback: callback})
        if (eventString == 'params-changed') {
            callback(this.params);
        }

    }

    notify(eventString) {
        this.listeners.forEach((observer) => {
            if (observer.term == eventString) {
                observer.callback(data)
            }
        })
    }

    setParams(newParams: any, prevParams?: any) {
        /*
        overwrites current params
        notifies listeners of param change
        updates list from params changed method
        notifies listeners of list change
        altParams and additional params, usually loaded before initialization
        */
        const params: any = {}

        if (prevParams !== undefined) {
            Object.keys(prevParams).forEach((k) => {
                if (!(prevParams[k] == undefined || prevParams[k] == '')) {
                    params[k] = prevParams[k];
                }
            })
        }

        Object.keys(newParams).forEach((k) => {
            if (!(newParams[k] == undefined || newParams[k] == '')) {
                params[k] = newParams[k];
            }
        })
        if (params.page && params.page == 1) {
            delete params.page;
        }
        if (params.limit && params.limit == this.defaultLimit) {
            delete params.limit;
        }
        if (params.order && typeof params.order === "string") {
            params.order = [params.order];
        }
        this.params = params;
        this.url = urlStringFromParams(this.params);

        this.paramsChanged(this.getExtraParams(this.params))
            .then((results) => {
                this.results = results;
                this.list = this.results.results;
                this.notify('list-changed', this.list);
            });

        this.notify('params-changed', this.params);

    }



}


function urlStringFromParams(params: any): string {
    const url = new URL(window.location.origin + window.location.pathname);
    Object.keys(params).forEach((key) => {
        if (![undefined, 'undefined'].includes(params[key])) {
            url.searchParams.append(key, params[key])
        }
    })
    return url.toString();
}
