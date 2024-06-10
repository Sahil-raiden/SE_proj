import { createContext, useReducer } from 'react';

export const NewsContext = createContext();

export const NewsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NEWS': 
      return {
        news: action.payload
      };
    case 'CREATE_NEWS':
      return {
        news: [action.payload, ...state.news]
      };
    case 'DELETE_NEWS':
      return {
        news: state.news.filter((w) => w._id !== action.payload._id)
      };
    default:
      return state;
  }
};

export const NewscontextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(NewsReducer, {
    news: [] // Initial state should be news, not News
  });

  return (
    <NewsContext.Provider value={{...state, dispatch}}>
      { children }
    </NewsContext.Provider>
  );
};