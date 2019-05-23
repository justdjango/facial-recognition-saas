let DEBUG = false;
let host = "http://127.0.0.1:8000";
let stripePublishKey = "pk_test_fIPmHO5lxk4fFRiahVdem0oF";
if (DEBUG === false) {
  host = "http://165.22.94.250";
  stripePublishKey = "pk_test_fIPmHO5lxk4fFRiahVdem0oF";
}

export { stripePublishKey };

export const APIEndpoint = `${host}/api`;

export const fileUploadURL = `${APIEndpoint}/demo/`;
export const facialRecognitionURL = `${APIEndpoint}/upload/`;
export const emailURL = `${APIEndpoint}/email/`;
export const changeEmailURL = `${APIEndpoint}/change-email/`;
export const changePasswordURL = `${APIEndpoint}/change-password/`;
export const billingURL = `${APIEndpoint}/billing/`;
export const subscribeURL = `${APIEndpoint}/subscribe/`;
export const APIkeyURL = `${APIEndpoint}/api-key/`;
export const cancelSubscriptionURL = `${APIEndpoint}/cancel-subscription/`;
