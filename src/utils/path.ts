import {AUTOMATIC_SUBMIT_PATH, DASHBOARD_PATH, MY_CANISTER_PATH, STANDARD_SUBMIT_PATH} from '@/constants';

export const getCurrentPath = (): string => window.location.pathname;

export const isDashboardPage = () => getCurrentPath() === DASHBOARD_PATH;
export const isCanisterDetailPage = () => getCurrentPath().includes('/canister/');

export const isMyCanisterPage = () => getCurrentPath() === MY_CANISTER_PATH;
export const isMyCanisterDetailPage = () => getCurrentPath().includes('/my-canister/');

export const isStandardSubmitPage = () => getCurrentPath() === STANDARD_SUBMIT_PATH;
export const isAutoSubmitPage = () => getCurrentPath() === AUTOMATIC_SUBMIT_PATH;
