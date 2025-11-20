import api from './api';
import { refreshToken, clientLogout } from '../stores/authSlice'; // Import action cần thiết
import type { Store } from '@reduxjs/toolkit';

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

export const setupAxiosInterceptors = (store: Store) => {
    api.interceptors.request.use(
        (config) => {
            const state = store.getState() as any;
            const accessToken = state.auth?.accessToken;

            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    api.interceptors.response.use(
        (res) => res,
        async (err) => {
            const originalConfig = err.config;

            if (originalConfig.url !== '/auth/login' && err.response) {
                if (err.response.status === 401 && !originalConfig._retry) {
                    if (isRefreshing) {
                        return new Promise(function (resolve, reject) {
                            failedQueue.push({ resolve, reject });
                        })
                            .then((token) => {
                                originalConfig.headers['Authorization'] =
                                    'Bearer ' + token;
                                return api(originalConfig);
                            })
                            .catch((err) => {
                                return Promise.reject(err);
                            });
                    }

                    originalConfig._retry = true;
                    isRefreshing = true;

                    try {
                        const state = store.getState() as any;
                        const oldRefreshToken = state.auth.refreshToken;

                        if (!oldRefreshToken) {
                            throw new Error('No refresh token');
                        }
                        const actionResult: any = await store.dispatch(
                            refreshToken(oldRefreshToken) as any
                        );
                        const newAccessToken =
                            actionResult.payload?.accessToken;

                        if (newAccessToken) {
                            api.defaults.headers.common[
                                'Authorization'
                            ] = `Bearer ${newAccessToken}`;
                            processQueue(null, newAccessToken);
                            return api(originalConfig);
                        } else {
                            throw new Error('Refresh failed');
                        }
                    } catch (_error) {
                        processQueue(_error, null);
                        store.dispatch(clientLogout());
                        return Promise.reject(_error);
                    } finally {
                        isRefreshing = false;
                    }
                }
            }
            return Promise.reject(err);
        }
    );
};
