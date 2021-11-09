import { configureStore } from '@reduxjs/toolkit';
import { reducer as reduxFormReducer } from 'redux-form';

import userReducer from './slices/userSlice';
import themeReducer from './slices/themeSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    form: reduxFormReducer,
  },
});
