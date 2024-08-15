import { useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import useUserStore from './userStore';
import ENDPOINT from '../apis/endpoint';
import useNotificationStore from './notificationStore';
import userStore from './userStore';

const SSE_URL = ENDPOINT + '/notify/subscribe'; // SSE 연결 URL

export const useSSE = () => {
    const notificationStore = useNotificationStore();
    const connectionRef = useRef<boolean>(false);
    const userInfo = useUserStore((state) => state.userInfo);
    const { token } = userStore((state) => state);

    const connectSSE = useCallback(() => {
        if (!userInfo?.userIdx) {
            console.log('No userIdx available, cannot connect to SSE');
            return;
        }

        console.log('Attempting SSE connection...');
        const url = `${SSE_URL}?userId=${userInfo.userIdx}`;
        console.log('SSE URL:', url);

        const source = axios.CancelToken.source();

        axios
            .get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'text/event-stream',
                    'Content-Type': 'application/json;charset=UTF-8',
                },
                responseType: 'stream',
                cancelToken: source.token,
            })
            .then((response) => {
                connectionRef.current = true;
                console.log('SSE connection initiated');

                let buffer = '';
                response.data.on('data', (chunk: Buffer) => {
                    buffer += chunk.toString();
                    const lines = buffer.split('\n\n');
                    buffer = lines.pop() || '';

                    lines.forEach((line) => {
                        if (line.trim() !== '') {
                            try {
                                const data = JSON.parse(line.replace(/^data: /, ''));
                                notificationStore.addNotification(data);
                                console.log('SSE event received:', data);
                            } catch (error) {
                                console.error('Error parsing SSE data:', error);
                            }
                        }
                    });
                });

                response.data.on('end', () => {
                    console.log('SSE connection closed');
                    connectionRef.current = false;
                });
            })
            .catch((error) => {
                if (axios.isCancel(error)) {
                    console.log('SSE connection cancelled');
                } else {
                    console.error('SSE error:', error);
                }
                connectionRef.current = false;
            });

        return () => {
            source.cancel('SSE connection cancelled by user');
        };
    }, [userInfo, notificationStore]);

    const disconnectSSE = useCallback(() => {
        if (connectionRef.current) {
            console.log('Disconnecting SSE');
            connectionRef.current = false;
            // 실제 연결 종료는 connectSSE에서 반환된 cleanup 함수에 의해 처리됩니다.
        }
    }, []);

    useEffect(() => {
        console.log('useEffect triggered. Current userInfo:', userInfo);
        let cleanup: (() => void) | undefined;

        if (userInfo?.userIdx) {
            console.log('UserInfo is available, attempting to connect SSE');
            cleanup = connectSSE();
        } else {
            console.log('No valid userInfo, disconnecting SSE if connected');
            disconnectSSE();
        }

        return () => {
            console.log('Cleanup function called, disconnecting SSE');
            cleanup && cleanup();
            disconnectSSE();
        };
    }, [userInfo, connectSSE, disconnectSSE]);

    return { isConnected: connectionRef.current };
};
