/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export var cidaasLoginProvider = {
    appScope: ['email', 'roles', 'profile', 'offline_access'],
    responseType: 'code',
    redirectUri: 'http://localhost:8000/callback',
    code_challenge: '9235487394587-xcode',
    code_challenge_method: 'S256',
    nonce: '12345678909876'
};
/** @type {?} */
export var cidaasRegisterProvider = {
    appScope: ['email', 'roles', 'profile', 'offline_access'],
    responseType: 'code',
    redirectUri: 'http://localhost:8000/register',
    code_challenge: '9235487394587-xcode',
    code_challenge_method: 'S256',
    nonce: '1234543267890',
    viewType: 'register'
};
/** @type {?} */
export var bodyParam = { grant_type: 'authorization_code' };
/** @type {?} */
export var loginDesign = {
    closebuttoncolor: '#dd0060',
    hardwareback: 'no',
    hidenavigationbuttons: 'no',
    hideurlbar: 'yes',
    navigationbuttoncolor: '#dd0060',
    toolbarcolor: '#f7f7f7'
};
/** @type {?} */
export var registerDesign = {
    closebuttoncolor: '#dd0060',
    hardwareback: 'no',
    hidenavigationbuttons: 'no',
    hideurlbar: 'yes',
    navigationbuttoncolor: '#dd0060',
    toolbarcolor: '#f7f7f7'
};
/** @type {?} */
export var userObject = {
    message: '',
    status: '',
    accessToken: '',
    refreshToken: ''
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2lkYWFzLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3JlaGF1LWZ1bmN0aW9uYWwtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9jb25maWcvY2lkYWFzLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE1BQU0sS0FBTyxtQkFBbUIsR0FBRztJQUNqQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsQ0FBQztJQUN6RCxZQUFZLEVBQUUsTUFBTTtJQUNwQixXQUFXLEVBQUUsZ0NBQWdDO0lBQzdDLGNBQWMsRUFBRSxxQkFBcUI7SUFDckMscUJBQXFCLEVBQUUsTUFBTTtJQUM3QixLQUFLLEVBQUUsZ0JBQWdCO0NBQ3hCOztBQUNELE1BQU0sS0FBTyxzQkFBc0IsR0FBRztJQUNwQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsQ0FBQztJQUN6RCxZQUFZLEVBQUUsTUFBTTtJQUNwQixXQUFXLEVBQUUsZ0NBQWdDO0lBQzdDLGNBQWMsRUFBRSxxQkFBcUI7SUFDckMscUJBQXFCLEVBQUUsTUFBTTtJQUM3QixLQUFLLEVBQUUsZUFBZTtJQUN0QixRQUFRLEVBQUUsVUFBVTtDQUNyQjs7QUFFRCxNQUFNLEtBQU8sU0FBUyxHQUFHLEVBQUUsVUFBVSxFQUFFLG9CQUFvQixFQUFFOztBQUU3RCxNQUFNLEtBQU8sV0FBVyxHQUFHO0lBQ3pCLGdCQUFnQixFQUFFLFNBQVM7SUFDM0IsWUFBWSxFQUFFLElBQUk7SUFDbEIscUJBQXFCLEVBQUUsSUFBSTtJQUMzQixVQUFVLEVBQUUsS0FBSztJQUNqQixxQkFBcUIsRUFBRSxTQUFTO0lBQ2hDLFlBQVksRUFBRSxTQUFTO0NBQ3hCOztBQUVELE1BQU0sS0FBTyxjQUFjLEdBQUc7SUFDNUIsZ0JBQWdCLEVBQUUsU0FBUztJQUMzQixZQUFZLEVBQUUsSUFBSTtJQUNsQixxQkFBcUIsRUFBRSxJQUFJO0lBQzNCLFVBQVUsRUFBRSxLQUFLO0lBQ2pCLHFCQUFxQixFQUFFLFNBQVM7SUFDaEMsWUFBWSxFQUFFLFNBQVM7Q0FDeEI7O0FBQ0QsTUFBTSxLQUFPLFVBQVUsR0FBRztJQUN4QixPQUFPLEVBQUUsRUFBRTtJQUNYLE1BQU0sRUFBRSxFQUFFO0lBQ1YsV0FBVyxFQUFFLEVBQUU7SUFDZixZQUFZLEVBQUUsRUFBRTtDQUNqQiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBjaWRhYXNMb2dpblByb3ZpZGVyID0ge1xuICBhcHBTY29wZTogWydlbWFpbCcsICdyb2xlcycsICdwcm9maWxlJywgJ29mZmxpbmVfYWNjZXNzJ10sXG4gIHJlc3BvbnNlVHlwZTogJ2NvZGUnLFxuICByZWRpcmVjdFVyaTogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9jYWxsYmFjaycsXG4gIGNvZGVfY2hhbGxlbmdlOiAnOTIzNTQ4NzM5NDU4Ny14Y29kZScsXG4gIGNvZGVfY2hhbGxlbmdlX21ldGhvZDogJ1MyNTYnLFxuICBub25jZTogJzEyMzQ1Njc4OTA5ODc2J1xufTtcbmV4cG9ydCBjb25zdCBjaWRhYXNSZWdpc3RlclByb3ZpZGVyID0ge1xuICBhcHBTY29wZTogWydlbWFpbCcsICdyb2xlcycsICdwcm9maWxlJywgJ29mZmxpbmVfYWNjZXNzJ10sXG4gIHJlc3BvbnNlVHlwZTogJ2NvZGUnLFxuICByZWRpcmVjdFVyaTogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9yZWdpc3RlcicsXG4gIGNvZGVfY2hhbGxlbmdlOiAnOTIzNTQ4NzM5NDU4Ny14Y29kZScsXG4gIGNvZGVfY2hhbGxlbmdlX21ldGhvZDogJ1MyNTYnLFxuICBub25jZTogJzEyMzQ1NDMyNjc4OTAnLFxuICB2aWV3VHlwZTogJ3JlZ2lzdGVyJ1xufTtcblxuZXhwb3J0IGNvbnN0IGJvZHlQYXJhbSA9IHsgZ3JhbnRfdHlwZTogJ2F1dGhvcml6YXRpb25fY29kZScgfTtcblxuZXhwb3J0IGNvbnN0IGxvZ2luRGVzaWduID0ge1xuICBjbG9zZWJ1dHRvbmNvbG9yOiAnI2RkMDA2MCcsXG4gIGhhcmR3YXJlYmFjazogJ25vJyxcbiAgaGlkZW5hdmlnYXRpb25idXR0b25zOiAnbm8nLFxuICBoaWRldXJsYmFyOiAneWVzJyxcbiAgbmF2aWdhdGlvbmJ1dHRvbmNvbG9yOiAnI2RkMDA2MCcsXG4gIHRvb2xiYXJjb2xvcjogJyNmN2Y3ZjcnXG59O1xuXG5leHBvcnQgY29uc3QgcmVnaXN0ZXJEZXNpZ24gPSB7XG4gIGNsb3NlYnV0dG9uY29sb3I6ICcjZGQwMDYwJyxcbiAgaGFyZHdhcmViYWNrOiAnbm8nLFxuICBoaWRlbmF2aWdhdGlvbmJ1dHRvbnM6ICdubycsXG4gIGhpZGV1cmxiYXI6ICd5ZXMnLFxuICBuYXZpZ2F0aW9uYnV0dG9uY29sb3I6ICcjZGQwMDYwJyxcbiAgdG9vbGJhcmNvbG9yOiAnI2Y3ZjdmNydcbn07XG5leHBvcnQgY29uc3QgdXNlck9iamVjdCA9IHtcbiAgbWVzc2FnZTogJycsXG4gIHN0YXR1czogJycsXG4gIGFjY2Vzc1Rva2VuOiAnJyxcbiAgcmVmcmVzaFRva2VuOiAnJ1xufTtcblxuIl19