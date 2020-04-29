export interface SettingsModel {
    settingsParams: {
        settingStatus: string,
        units: {
            flow: {
                parameters: any,
                selectedParam: number;
            },
            amount: {
                parameters: any,
                selectedParam: number;
            },
            pressure: {
                parameters: any,
                selectedParam: number;
            },
            temperature: {
                parameters: any,
                selectedParam: number;
            },
        },
        dropLeakage: {
            status: string,
            time: {
                parameters: any,
                selectedParam: number;
            },
            frequency: {
                parameters: any,
                selectedParam: number;
            },
            action: {
                parameters: any,
                selectedParam: number;
            },
        },
        limits: {
            present: {
                parameters: any,
                selectedParam: number;
            },
            absent: {
                parameters: any,
                selectedParam: number;
            },
        },
    };
}


export interface LeakageSettingsModel {
    dropLeakage: {
        status: string,
        time: {
            parameters: any,
            selectedParam: number;
        },
        frequency: {
            parameters: any,
            selectedParam: number;
        },
        action: {
            parameters: any,
            selectedParam: number;
        },
    };
}




