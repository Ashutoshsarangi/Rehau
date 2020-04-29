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
  SECRET_KEY: '1234567890',
  BASE_URL: '',
  backendBasePath: 'https://dev.smarthome-dev.aws.rehau.com',
  currentLanguage: 'es',
  loginScreenUrl: 'home',
};
