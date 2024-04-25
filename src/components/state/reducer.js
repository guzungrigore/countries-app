export const initialState = {
    favourite: JSON.parse(localStorage.getItem('favorite')) || []
}
export const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            if (!state.favourite.some(country => country.name.common === action.payload.name.common)) {
                return {
                    ...state,
                    favourite: [...state.favourite, action.payload],

                }
            }
            return state
        case "REMOVE":
            return {
                ...state,
                favourite: state.favourite.filter((country) => country.name.common !== action.payload.name.common)
            }
        default:
            return state
    }
}