const initialState = {
    projects: [],
    testers: [],
    currentProject: {}
};

const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_PROJECTS": {
            return {
                ...state,
                projects: action.payload
            };
        }

        case "ADD_PROJECT": {
            return {
                ...state,
                projects: [...state.projects, action.payload]
            };
        }

        case "ADD_TESTER":
        case "SET_TESTERS": {
            return {
                ...state,
                testers: [...action.payload]
            };
        }
        case "SET_CURRENT_PROJECT": {
            return {
                ...state,
                currentProject: action.payload
            };
        }

        case "DELETE_TESTER": {
            state.currentProject.testers = state.currentProject.testers.filter(tester => tester._id !== action.payload.id);
            return {
                ...state,
                currentProject: { ...state.currentProject }
            }
        }

        case "ACCEPT_TESTER": {
            state.currentProject.testers.find(tester => tester._id == action.payload.id).status = "Accepted";
            return {
                ...state,
                currentProject: { ...state.currentProject }
            }
        }

        case "LOGOUT":
            return initialState;

        default: return state;
    }
}

export default projectReducer;