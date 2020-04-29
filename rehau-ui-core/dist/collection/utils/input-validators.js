import { patterns } from '../components/constants';
export function validateInput(validators, value) {
    const errors = [];
    (validators || [])
        .sort((validA, validB) => validA.priority - validB.priority)
        .map(validator => {
        const error = validator.errorMessage
            ? validator.errorMessage
            : `this check [${validator.type.toUpperCase()}] has failed`;
        switch (validator.type) {
            case 'required':
                if (!checkIfValueExist(value)) {
                    errors.push(error);
                }
                break;
            case 'requiredTrue':
                if (!checkIfValueIsTrue(value)) {
                    errors.push(error);
                }
                break;
            case 'email':
                if (!!value && !value.toString().match(patterns.EMAIL)) {
                    errors.push(error);
                }
                break;
            case 'url':
                if (!!value && !value.toString().match(patterns.URL)) {
                    errors.push(error);
                }
                break;
            case 'min':
                if (!!value && Number(value) < validator.min) {
                    errors.push(error);
                }
                break;
            case 'max':
                if (!!value && Number(value) > validator.max) {
                    errors.push(error);
                }
                break;
            case 'minLength':
                if (!!value && value.toString().length < validator.minLength) {
                    errors.push(error);
                }
                break;
            case 'maxLength':
                if (!!value && value.toString().length > validator.maxLength) {
                    errors.push(error);
                }
                break;
            case 'regex':
                const regex = typeof validator.regex === 'string' ? new RegExp(validator.regex) : validator.regex;
                if (!!value && !value.toString().match(regex)) {
                    errors.push(error);
                }
                break;
            case 'custom':
                if (validator.customValidator && !validator.customValidator(value)) {
                    errors.push(error);
                }
                break;
        }
    });
    return {
        errors: errors,
        valid: errors.length === 0,
        currentValue: value
    };
}
export function checkIfRequired(validators) {
    return (validators &&
        validators.filter(validator => validator.type === 'required' || validator.type === 'requiredTrue').length > 0);
}
function checkIfValueExist(value) {
    let result = false;
    value = !!value && typeof value === 'string' ? value.trim() : value;
    if (value !== null && value !== undefined && value !== '' && value !== []) {
        result = true;
    }
    return result;
}
function checkIfValueIsTrue(value) {
    let result = false;
    if (checkIfValueExist(value) && !!value) {
        result = true;
    }
    return result;
}
