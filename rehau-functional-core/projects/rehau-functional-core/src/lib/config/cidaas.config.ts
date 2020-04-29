export const cidaasLoginProvider = {
  appScope: ['email', 'roles', 'profile', 'offline_access'],
  responseType: 'code',
  redirectUri: 'http://localhost:8000/callback',
  code_challenge: '9235487394587-xcode',
  code_challenge_method: 'S256',
  nonce: '12345678909876'
};
export const cidaasRegisterProvider = {
  appScope: ['email', 'roles', 'profile', 'offline_access'],
  responseType: 'code',
  redirectUri: 'http://localhost:8000/register',
  code_challenge: '9235487394587-xcode',
  code_challenge_method: 'S256',
  nonce: '1234543267890',
  viewType: 'register'
};

export const bodyParam = { grant_type: 'authorization_code' };

export const loginDesign = {
  closebuttoncolor: '#dd0060',
  hardwareback: 'no',
  hidenavigationbuttons: 'no',
  hideurlbar: 'yes',
  navigationbuttoncolor: '#dd0060',
  toolbarcolor: '#f7f7f7'
};

export const registerDesign = {
  closebuttoncolor: '#dd0060',
  hardwareback: 'no',
  hidenavigationbuttons: 'no',
  hideurlbar: 'yes',
  navigationbuttoncolor: '#dd0060',
  toolbarcolor: '#f7f7f7'
};
export const userObject = {
  message: '',
  status: '',
  accessToken: '',
  refreshToken: ''
};

