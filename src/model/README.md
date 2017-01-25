# Model


## Responsibilities

### Store

The store is exported as `store`.  It initially contains the default
state of the application. The reducer is modular and delegated
to submodules such as `articles.js`. Each submodule provides a reducer
that produces default state when invoked with no arguments. Submodule
reducers are combined with `Redux.combineReducers` to create the
final reducer to initialize the store.

### Action Constructors

The action constructors are exported as `acions`. Actions are an object
with each key mapped to an action constructor.

The action constructors are gathered from submodules. By convention,
submodules follow the same convention as the main module and expose
their actions through an `actions` export. All sub-module actions are
merged by the module so it is important that each submodule use
unique constructor names.

## Testing

Testing is performed by each submodule on its own reducer and actions.
We currently do not test the composition since making it testable could
reduce readability and it is pretty straightforward wiring.

In the future, I might figure out how to test the wiring and maintain
readability.
