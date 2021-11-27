const defaultState = {
  IsMobile: false
}

const SET_IsMobile = "SET_IsMobile";


export function App(state = defaultState, action) {
  switch (action.type) {
    case SET_IsMobile:
      return { ...state, IsMobile: action.payload };


    default:
      return state;
  }
}