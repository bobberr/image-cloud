const React = require('react');
const ReactDOM = require('react-dom');
const UserCompon = require('./components/UserCompon');
const router = require('react-router');
const browserHistory = router.browserHistory;
const Router = router.Router;
const Route = router.Route;
const Link = router.Link;
const syncHistoryWithStore = require('react-router-redux').syncHistoryWithStore;
const routerReducer = require('react-router-redux').routerReducer;
const createStore = require('redux').createStore;
const combineReducers = require('redux').combineReducers;
const Provider = require('react-redux').Provider;
const persistStore = require('redux-persist').persistStore;
const autoRehydrate = require('redux-persist').autoRehydrate;
const compose = require('redux').compose;
require('./style.scss');
// require('../dist/script/main');
const reducer = require('./reducers/userReducer');
const store = createStore(combineReducers({appState: reducer, routing: routerReducer}), autoRehydrate());
const history = syncHistoryWithStore(browserHistory, store);
const createFilter = require('redux-persist-transform-filter').createFilter;
const saveFilter = createFilter(
    'appState', ['loggedIn', 'data']
)
persistStore(store, {transforms: [saveFilter]});
const App = () => {
    return (
        <Provider store={store}>
            <Router history={history}>
                <Route path="/" component={UserCompon}></Route>
            </Router>
        </Provider>
    )
}

ReactDOM.render(<App/>, document.getElementById('app'));
