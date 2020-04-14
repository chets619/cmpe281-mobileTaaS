const initialState = {
    currentUser: {}
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_PROFILE_DATA": {
            return {
                ...state,
                currentUser: action.payload
            };
        }

        default: return state;
    }
}

export default profileReducer;