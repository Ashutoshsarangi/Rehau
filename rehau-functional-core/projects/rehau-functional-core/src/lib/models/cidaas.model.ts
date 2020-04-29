import { IOAuthOptions } from 'ionic-cordova-oauth/dist/provider';

export interface ITokenEndpointBody {
  grant_type: string;
  client_id: string;
  code?: string;
  redirect_uri?: string;
  code_verifier?: string;
  refresh_token?: string;
}
export interface IcidaasProviderOptions extends IOAuthOptions {
  authType?: string;
  code_challenge?: string;
  code_challenge_method?: string;
  nonce?: string;
  viewType?: string;
}

export interface ITokenEndpointResponse {
  error?: string;
  error_description?: string;
  access_token?: string;
  refresh_token?: string;
  id_token?: string;
}
