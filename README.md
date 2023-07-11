# data-tables

This describes how to put together a custom dynamic data-table style component in javascript. I will try to keep the
details generic, using only javascript and html snippets. You should be able to port these relatively easily into 
the framework you are using, such as Vue, Angular, React or Aurelia.

## Components

### DataTable

This is the main component, the parent of all others. The DataTable component, contains other components, and wires them
all to a single ListController together.

### ListController

This list controller does not have a view component, but all components hold a reference to the same instance
of the ListController. Each component will also register as an EventListener on the list controller. When the user interacts with a component, the component calls a function on the ListController
to update that parameter. The ListController then calls the API with the appropriate parameters. When the API responds, 
the ListController will notify all the registered components that the data has changed.

This base ListController class should be as generic as possible, the classes you actually use in your
components will inherit from ListController and ideally only replace the paramsChanged(newParams) method. This 
method is called when the user interacts with a component, and causes a filter parameter to change. The
paramsChanged(newParams) method should call the API using the new parameters and return the promise.

### ListComponent



### PaginationComponent

### ColumnHeaderComponent

### FilterComponents


### AmountComponent