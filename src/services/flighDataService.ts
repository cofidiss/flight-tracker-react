import { Client } from '@stomp/stompjs';
import { FlightCoordinateRangeFilter, FlightCustomFilter, FlightData } from '../models/models';

export function sendflightCoordinateRangeFilterData(
  stompClient: Client | null,
  filter: FlightCoordinateRangeFilter | null,
) {
  if (filter == null || stompClient == null || stompClient.connected == false) {
    return;
  }

  console.log('sendflightCoordinateRangeFilterData');
  stompClient.publish({
    destination: '/app/live',
    body: JSON.stringify(filter),
  });
}

export function connectToFlightStream(options: {
  baseUrl: string | undefined;
  stompClientRef?: { current: Client | null };
  onSessionIdReceived: (sessionId: string) => void;
  onFlightsReceived: (flightData: FlightData) => void;
  onInitialFilterSend: (stompClient: Client) => void;
  onError?: (error: unknown) => void;
}) {
  if (!options.baseUrl) {
    console.warn('Socket URL is not configured. Skipping WebSocket connection.');
    return undefined;
  }

  const socketUrl = `${options.baseUrl}/ws`;

  try {
    const stompClient = new Client({
      brokerURL: socketUrl,
      reconnectDelay: 5000,
    });

    console.log('socketUrl', socketUrl);

    if (options.stompClientRef) {
      options.stompClientRef.current = stompClient;
    }

    stompClient.onWebSocketError = (error) => {
      console.error('WebSocket error:', error);
      options.onError?.(error);
    };

    stompClient.onStompError = (frame) => {
      console.error('STOMP error:', frame);
      options.onError?.(frame);
    };

    stompClient.onConnect = () => {
      console.log('Connected to WebSocket');

      stompClient.subscribe('/user/topic/getSessionId', (messageOutput) => {
        try {
          const sessionId = messageOutput.body;
          console.log('getSessionId', sessionId);
          options.onSessionIdReceived(sessionId);
        } catch (error) {
          console.error('getSessionId error:', error, messageOutput.body);
        }
        stompClient.unsubscribe('/topic/getSessionId');
      });

      stompClient.subscribe('/user/topic/liveflight', (messageOutput) => {
        try {
          const flightData = JSON.parse(messageOutput.body) as FlightData;
          console.log('Live flight data:', flightData);
          options.onFlightsReceived(flightData);
        } catch (error) {
          console.error('JSON parse error:', error, messageOutput.body);
        }
      });

      options.onInitialFilterSend(stompClient);

      stompClient.publish({
        destination: '/app/getSessionId',
      });
    };

    stompClient.activate();

    return () => {
      console.log('Disconnected from WebSocket');
      stompClient.deactivate();
    };
  } catch (error) {
    console.error('WebSocket connection error:', error);
    return undefined;
  }
}

export function sendFlightCustomFilterData(
  stompClient: Client | null,
  filter: FlightCustomFilter | null,
) {
  if (filter == null || stompClient == null || stompClient.connected == false) {
    return;
  }

  stompClient.publish({
    destination: '/app/custom-filter',
    body: JSON.stringify(filter),
  });
}