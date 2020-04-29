import { createAction, props } from '@ngrx/store';
import { CidaasState } from '../../../models/auth.model';

export const userInfoAction = createAction('User info from CIDAAS', props<{ payload: CidaasState }>());

