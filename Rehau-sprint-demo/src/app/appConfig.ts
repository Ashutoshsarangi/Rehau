export const cidaasConfig = {
  cidaasClientId: '9feab210-c025-406d-a10c-3d8323214491',
  cidaasBaseURL: 'https://accounts.rehau.com',
  ciddasTokenEndpoint: 'https://accounts.rehau.com/token-srv/token',
  cidaasRevokeUrl: 'https://accounts.rehau.com/authz-srv/revoke',
  cidaasRegisterProvider: {
    appScope: ['email', 'roles', 'profile', 'offline_access'],
    responseType: 'code',
    redirectUri: 'http://localhost:8000/register',
    code_challenge: '9235487394587-xcode',
    code_challenge_method: 'S256',
    nonce: '1234543267890',
    viewType: 'register'
  },
  cidaasLoginProvider: {
    appScope: ['email', 'roles', 'profile', 'offline_access'],
    responseType: 'code',
    redirectUri: 'http://localhost:8000/callback',
    code_challenge: '9235487394587-xcode',
    code_challenge_method: 'S256',
    nonce: '12345678909876'
  },
  cidaasLoginDesign: {
    closebuttoncolor: '#dd0060',
    hardwareback: 'no',
    hidenavigationbuttons: 'no',
    hideurlbar: 'yes',
    navigationbuttoncolor: '#dd0060',
    toolbarcolor: '#f7f7f7'
  },
  cidaasRegisterDesign: {
    closebuttoncolor: '#dd0060',
    hardwareback: 'no',
    hidenavigationbuttons: 'no',
    hideurlbar: 'yes',
    navigationbuttoncolor: '#dd0060',
    toolbarcolor: '#f7f7f7'
  }
};

export const globalConfig = {
  currentLanguage: 'en',
  // currentLanguage: 'es',
  SECRET_KEY: '1234567890',
  BASE_URL: '',
  backendBasePath: 'https://dev.smarthome-dev.aws.rehau.com',
  loginScreenUrl: 'login',
};

export const globalHeader = [
  {
    url: '/',
    headerObject: {
      title: 'My Home',
      subTitle: 'Your home is protected'
    }
  },
  {
    url: '/landing',
    headerObject: {
      title: 'My Home',
      subTitle: 'Your home is protected'
    }
  },
  {
    url: '/landing/home',
    headerObject: {
      title: 'My Home',
      subTitle: 'Your home is protected'
    }
  },
  {
    url: '/landing/notification',
    headerObject: {
      title: 'Notification',
    }
  },
  {
    url: '/landing/settings',
    headerObject: {
      title: 'Settings',
    }
  },
  {
    url: '/settings/units',
    headerObject: {
      title: 'Units',
      innerPageHeader: true
    }
  },
  {
    url: '/settings/units/flow',
    headerObject: {
      title: 'Flow',
      innerPageHeader: true
    }
  },
  {
    url: '/settings/units/amount',
    headerObject: {
      title: 'Amount',
      innerPageHeader: true
    }
  },
  {
    url: '/settings/units/pressure',
    headerObject: {
      title: 'Pressure',
      innerPageHeader: true
    }
  },
  {
    url: '/settings/units/temperature',
    headerObject: {
      title: 'Temperature',
      innerPageHeader: true
    }
  },
  {
    url: '/settings/leakage',
    headerObject: {
      title: 'Drop Leakage',
      innerPageHeader: true
    }
  },
  {
    url: '/settings/leakage/time',
    headerObject: {
      title: 'Time',
      innerPageHeader: true
    }
  },
  {
    url: '/settings/leakage/frequency',
    headerObject: {
      title: 'Frequency',
      innerPageHeader: true
    }
  },
  {
    url: '/settings/leakage/action',
    headerObject: {
      title: 'Action',
      innerPageHeader: true
    }
  },
  {
    url: '/settings/limits',
    headerObject: {
      title: 'Limits',
      innerPageHeader: true
    }
  },
  {
    url: '/settings/limits/present',
    headerObject: {
      title: 'Present',
      innerPageHeader: true
    }
  },
  {
    url: '/settings/limits/absent',
    headerObject: {
      title: 'Absent',
      innerPageHeader: true
    }
  },
  {
    url: '/settings/information',
    headerObject: {
      title: 'Info',
      innerPageHeader: true
    }
  },
  {
    url: '/settings/information/dataprivacy',
    headerObject: {
      title: 'Data privacy',
      innerPageHeader: true
    }
  },
  {
    url: '/settings/information/terms-and-conditions',
    headerObject: {
      title: 'Terms and conditions',
      innerPageHeader: true
    }
  },
  {
    url: '/settings/information/imprint',
    headerObject: {
      title: 'imprint',
      innerPageHeader: true
    }
  },
  {
    url: '/settings/get-help',
    headerObject: {
      title: 'Get help',
      innerPageHeader: true
    }
  }
];
