import { combineReducers } from 'redux';
import Auth from './Auth';
import Theme from './Theme';
import selectedObjectsReducer from "./selectedObjectsReducer";

const reducers = combineReducers({
    theme: Theme,
    auth: Auth,
    selectedObjects: selectedObjectsReducer,
});

export default reducers;