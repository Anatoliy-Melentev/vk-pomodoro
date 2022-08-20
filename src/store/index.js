import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import { tasksReducer } from './task/reducer';
import { timerReducer } from './timer/reducer';
import { editModeReducer } from './editMode/reducer';
import { statisticsReducer } from './statistics/reducer';
import { preferencesReducer } from './preferences/reducer';


const rootReducer = combineReducers({
  task: tasksReducer,
  timer: timerReducer,
  editMode: editModeReducer,
  statistics: statisticsReducer,
  preferences: preferencesReducer,
});

const persistConfig = {
  key: 'tasks',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);
export const persistor = persistStore(store);
