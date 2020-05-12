const initialState = {
    allDevices: {
        "Samsung Galaxy S10": "70eaaf75-bd9a-406d-9f01-682a5d400c6e",
        "Pixel 3": "c259202b-6605-44eb-978c-040b2edbc364",
        "Samsung Galaxy Note 10+": "a3f26fce-0632-4df4-88aa-cbddbc739e1e",
        "Google Pixel XL": "ea5fda48-fa8b-48c1-8acc-07d910856141"

    },
    emulatorToken: ""
};

const emulatorReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_EMULATOR_TOKEN": {
            return {
                ...state,
                emulatorToken: action.payload
            };
        }

        case "LOGOUT":
            return initialState;

        default: return state;
    }
}

export default emulatorReducer;