const initialState = {
    projects: [],
    testers: [],
    currentProject: {},
    files: [],
    runs: [],
    messages: [],
    OS: ['Android', 'iOS'],
    appFileTypes: ['ANDROID_APP', 'IOS_APP'],
    testTypes: ['BUILTIN_FUZZ', 'BUILTIN_EXPLORER', 'APPIUM_JAVA_JUNIT', 'APPIUM_JAVA_TESTNG', 'APPIUM_PYTHON',
        'APPIUM_NODE', 'APPIUM_RUBY', 'CALABASH', 'INSTRUMENTATION', 'UIAUTOMATION', 'UIAUTOMATOR',
        'XCTEST', 'XCTEST_UI'],
    testPackageFileTypes: ['', '', 'APPIUM_JAVA_JUNIT_TEST_PACKAGE', 'APPIUM_JAVA_TESTNG_TEST_PACKAGE', 'APPIUM_PYTHON_TEST_PACKAGE',
        'APPIUM_NODE_TEST_PACKAGE', 'APPIUM_RUBY_TEST_PACKAGE', 'CALABASH_TEST_PACKAGE', 'INSTRUMENTATION_TEST_PACKAGE',
        'UIAUTOMATION_TEST_PACKAGE', 'UIAUTOMATOR_TEST_PACKAGE', 'XCTEST_TEST_PACKAGE', 'XCTEST_UI_TEST_PACKAGE'],

    allOptions: [[{ label: 'Samsung Galaxy S9 (Unlocked) - OS 8', value: 'arn:aws:devicefarm:us-west-2::device:F27533F73A894EBDACC0E1B694288B77' },
    { label: 'Samsung Galaxy S9+ (Unlocked) - OS 8', value: 'arn:aws:devicefarm:us-west-2::device:E86BDD6A40FB4235957517589B2DA368' },
    { label: 'Google Pixel 2 - OS 8', value: 'arn:aws:devicefarm:us-west-2::device:5F20BBED05F74D6288D51236B0FB9895' },
    { label: 'Google Pixel 2 XL - OS 8', value: 'arn:aws:devicefarm:us-west-2::device:033DADA53F38438E9DA269AFC8B682E8' },
    { label: 'Samsung Galaxy Note 10 - OS 9', value: 'arn:aws:devicefarm:us-west-2::device:851BA6E2A15E410FB93178EBC62F4B48' },
    { label: 'Samsung Galaxy S10 - OS 9', value: 'arn:aws:devicefarm:us-west-2::device:A7BA5D5470264C9E98C1A599B9BFFA73' },
    { label: 'Samsung Galaxy S10+ - OS 9', value: 'arn:aws:devicefarm:us-west-2::device:63CA317F2C79433081CD14AE3F2A5CB3' },
    { label: 'Samsung Galaxy S9+ (Unlocked) - OS 9', value: 'arn:aws:devicefarm:us-west-2::device:8F772FF1E1AE4433B82286B1DA52FED8' },
    { label: 'Samsung Galaxy S9 (Unlocked) - OS 9', value: 'arn:aws:devicefarm:us-west-2::device:CE68825ABE5A4740B56F10111FD47844' },
    { label: 'Samsung Galaxy A50 - OS 9', value: 'arn:aws:devicefarm:us-west-2::device:E4438F5D016544A8BB8557C459084F9D' },
    { label: 'Samsung Galaxy A40 - OS 9', value: 'arn:aws:devicefarm:us-west-2::device:DD61B8C65B1C46A9B3D5285A448BB4A4' },
    { label: 'Samsung Galaxy A70 - OS 9', value: 'arn:aws:devicefarm:us-west-2::device:2B6903A2FEBA4AD68E79F7BCD0B81FBA' },
    { label: 'Google Pixel 3 XL - OS 9', value: 'arn:aws:devicefarm:us-west-2::device:E1F3149FDC33484D824BCFF66003E609' },
    { label: 'Google Pixel 3 - OS 9', value: 'arn:aws:devicefarm:us-west-2::device:CF6DC11E4C99430BA9A1BABAE5B45364' },
    { label: 'Google Pixel 2 XL - OS 9', value: 'arn:aws:devicefarm:us-west-2::device:E64D26FE27644A39A4BCEF009CDD8645' },
    { label: 'Google Pixel 2 - OS 9', value: 'arn:aws:devicefarm:us-west-2::device:58D6FB12B3624256AED26D0F940D4427' }
    ],
    [{ label: 'Apple iPhone 7 - OS 12', value: 'arn:aws:devicefarm:us-west-2::device:334A79FA3096423885B15609A1A50E79' },
    { label: 'Apple iPhone 7 Plus - OS 12', value: 'arn:aws:devicefarm:us-west-2::device:51ED4AB875C543AC97E6F65F7473E7B8' },
    { label: 'Apple iPhone 8 - OS 12', value: 'arn:aws:devicefarm:us-west-2::device:AF74786682D3407D89BD16557FEE97A9' },
    { label: 'Apple iPhone X - OS 12', value: 'arn:aws:devicefarm:us-west-2::device:D125AEEE8614463BAE106865CAF4470E' },
    { label: 'Apple iPhone XR - OS 12', value: 'arn:aws:devicefarm:us-west-2::device:7FCC95F6737A434B9896FF77DA9E2DB6' },
    { label: 'Apple iPhone XS - OS 12', value: 'arn:aws:devicefarm:us-west-2::device:A490B12A656C49678A80B5B0F7D33FA1' },
    { label: 'Apple iPhone 8 Plus - OS 12.1', value: 'arn:aws:devicefarm:us-west-2::device:D89BB79517414C5E89ED1A98FEFC9D7A' },
    { label: 'Apple iPhone XS Max - OS 12.1', value: 'arn:aws:devicefarm:us-west-2::device:F4A92C7101524540AB9E17F2857551D4' },
    { label: 'Apple iPhone XR - OS 12.4.1', value: 'arn:aws:devicefarm:us-west-2::device:B5D4C9845DEA4EEB994FB44F572E0B5C' },
    { label: 'Apple iPhone 11 Pro - OS 13.1.3', value: 'arn:aws:devicefarm:us-west-2::device:FB7DB406870A445A90958D233DF789BC' },
    { label: 'Apple iPhone 11 Pro Max - OS 13.1.3', value: 'arn:aws:devicefarm:us-west-2::device:8DCCC145A8A54191B61C6EF67F27F507' },
    { label: 'Apple iPhone 11 - OS 13.1.3', value: 'arn:aws:devicefarm:us-west-2::device:8EFC9DF49F09451E831E93DA281DAF9F' }
    ]],
    devices: [{ label: 'Samsung Galaxy S9 (Unlocked) - OS 8', value: 'arn:aws:devicefarm:us-west-2::device:F27533F73A894EBDACC0E1B694288B77' },
    { label: 'Samsung Galaxy S9+ (Unlocked) - OS 8', value: 'arn:aws:devicefarm:us-west-2::device:E86BDD6A40FB4235957517589B2DA368' },
    { label: 'Google Pixel 2 - OS 8', value: 'arn:aws:devicefarm:us-west-2::device:5F20BBED05F74D6288D51236B0FB9895' },
    { label: 'Google Pixel 2 XL - OS 8', value: 'arn:aws:devicefarm:us-west-2::device:033DADA53F38438E9DA269AFC8B682E8' },
    { label: 'Samsung Galaxy Note 10 - OS 9', value: 'arn:aws:devicefarm:us-west-2::device:851BA6E2A15E410FB93178EBC62F4B48' },
    { label: 'Samsung Galaxy S10 - OS 9', value: 'arn:aws:devicefarm:us-west-2::device:A7BA5D5470264C9E98C1A599B9BFFA73' },
    { label: 'Samsung Galaxy S10+ - OS 9', value: 'arn:aws:devicefarm:us-west-2::device:63CA317F2C79433081CD14AE3F2A5CB3' },
    { label: 'Samsung Galaxy S9+ (Unlocked) - OS 9', value: 'arn:aws:devicefarm:us-west-2::device:8F772FF1E1AE4433B82286B1DA52FED8' },
    { label: 'Samsung Galaxy S9 (Unlocked) - OS 9', value: 'arn:aws:devicefarm:us-west-2::device:CE68825ABE5A4740B56F10111FD47844' },
    { label: 'Samsung Galaxy A50 - OS 9', value: 'arn:aws:devicefarm:us-west-2::device:E4438F5D016544A8BB8557C459084F9D' },
    { label: 'Samsung Galaxy A40 - OS 9', value: 'arn:aws:devicefarm:us-west-2::device:DD61B8C65B1C46A9B3D5285A448BB4A4' },
    { label: 'Samsung Galaxy A70 - OS 9', value: 'arn:aws:devicefarm:us-west-2::device:2B6903A2FEBA4AD68E79F7BCD0B81FBA' },
    { label: 'Google Pixel 3 XL - OS 9', value: 'arn:aws:devicefarm:us-west-2::device:E1F3149FDC33484D824BCFF66003E609' },
    { label: 'Google Pixel 3 - OS 9', value: 'arn:aws:devicefarm:us-west-2::device:CF6DC11E4C99430BA9A1BABAE5B45364' },
    { label: 'Google Pixel 2 XL - OS 9', value: 'arn:aws:devicefarm:us-west-2::device:E64D26FE27644A39A4BCEF009CDD8645' },
    { label: 'Google Pixel 2 - OS 9', value: 'arn:aws:devicefarm:us-west-2::device:58D6FB12B3624256AED26D0F940D4427' }
    ],
    allTestingFileNames: [[{ label: 'Android Test', value: 'AndroidTest.java' },
    { label: 'Android Test - 1', value: 'AndroidTest1.java' },
    { label: 'Android Test - 2', value: 'AndroidTest2.java' },
    { label: 'Android Test - 3', value: 'AndroidTest3.java' },
    { label: 'Android Test - 4', value: 'AndroidTest4.java' },
    { label: 'Android Test - 5', value: 'AndroidTest5.java' }],
    [{ label: 'IOS Test', value: 'IOSTest.java' },
    { label: 'IOS Test - 1', value: 'IOSTest1.java' },
    { label: 'IOS Test - 2', value: 'IOSTest2.java' },
    { label: 'IOS Test - 3', value: 'IOSTest3.java' },
    { label: 'IOS Test - 4', value: 'IOSTest4.java' },
    { label: 'IOS Test - 5', value: 'IOSTest5.java' }]],
    currentSetFileNames: [{ label: 'Android Test', value: 'AndroidTest.java' },
    { label: 'Android Test - 1', value: 'AndroidTest1.java' },
    { label: 'Android Test - 2', value: 'AndroidTest2.java' },
    { label: 'Android Test - 3', value: 'AndroidTest3.java' },
    { label: 'Android Test - 4', value: 'AndroidTest4.java' },
    { label: 'Android Test - 5', value: 'AndroidTest5.java' }]
};

const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_PROJECTS": {
            return {
                ...state,
                projects: action.payload
            };
        }

        case "SET_FILES": {
            return {
                ...state,
                files: action.payload
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

        case "SET_RUNS": {
            return {
                ...state,
                runs: action.payload
            }
        }

        case "SET_MESSAGES": {
            return {
                ...state,
                messages: action.payload || []
            }
        }

        case "ADD_MESSAGE": {
            state.messages.push({
                ...action.payload,
                date: new Date()
            });

            return {
                ...state,
                messages: [...state.messages]
            }
        }

        case "LOGOUT":
            return initialState;

        default: return state;
    }
}

export default projectReducer;