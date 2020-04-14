const initialState = {
    projects: [],
    testers: []
};

const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_PROJECTS": {
            return {
                ...state,
                projects: action.payload
            };
        }

        case "ADD_TESTER":
        case "SET_TESTERS": {
            return {
                ...state,
                testers: [...action.payload]
            };
        }

        default: return state;
    }
}

export default projectReducer;