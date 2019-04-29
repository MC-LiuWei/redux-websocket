import * as actions from '../actions';
import * as actionTypes from '../actionTypes';

const PREFIX = 'ACTION_PREFIX';

describe('actions', () => {
  describe('user dispatched', () => {
    describe('connect', () => {
      it('should return the correct action with a default prefix', () => {
        const act = actions.connect('fake url');

        expect(act).toEqual({
          type: `${actionTypes.DEFAULT_PREFIX}::${actionTypes.WEBSOCKET_CONNECT}`,
          meta: { timestamp: expect.any(Date) },
          payload: {
            url: 'fake url',
          },
        });
      });

      it('should return the correct action with user prefix', () => {
        const act = actions.connect('fake url', PREFIX);

        expect(act).toEqual({
          type: `${PREFIX}::${actionTypes.WEBSOCKET_CONNECT}`,
          meta: { timestamp: expect.any(Date) },
          payload: {
            url: 'fake url',
          },
        });
      });
    });

    describe('disconnect', () => {
      it('should return the correct action with a default prefix', () => {
        const act = actions.disconnect();

        expect(act).toEqual({
          type: `${actionTypes.DEFAULT_PREFIX}::${actionTypes.WEBSOCKET_DISCONNECT}`,
          meta: { timestamp: expect.any(Date) },
        });
      });

      it('should return the correct action with user prefix', () => {
        const act = actions.disconnect(PREFIX);

        expect(act).toEqual({
          type: `${PREFIX}::${actionTypes.WEBSOCKET_DISCONNECT}`,
          meta: { timestamp: expect.any(Date) },
        });
      });
    });

    describe('send', () => {
      it('should return the correct action with a default prefix', () => {
        const act = actions.send({ test: 'value' });

        expect(act).toEqual({
          type: `${actionTypes.DEFAULT_PREFIX}::${actionTypes.WEBSOCKET_SEND}`,
          meta: { timestamp: expect.any(Date) },
          payload: {
            test: 'value',
          },
        });
      });

      it('should return the correct action with user prefix', () => {
        const act = actions.send({ test: 'value' }, PREFIX);

        expect(act).toEqual({
          type: `${PREFIX}::${actionTypes.WEBSOCKET_SEND}`,
          meta: { timestamp: expect.any(Date) },
          payload: {
            test: 'value',
          },
        });
      });
    });
  });

  describe('library dispatched', () => {
    describe('beginReconnect', () => {
      it('should return the correct action', () => {
        const act = actions.beginReconnect(PREFIX);

        expect(act).toEqual({
          type: `${PREFIX}::${actionTypes.WEBSOCKET_BEGIN_RECONNECT}`,
          meta: { timestamp: expect.any(Date) },
        });
      });
    });

    describe('reconnectAttempt', () => {
      it('should return the correct action', () => {
        const act = actions.reconnectAttempt(1, PREFIX);

        expect(act).toEqual({
          type: `${PREFIX}::${actionTypes.WEBSOCKET_RECONNECT_ATTEMPT}`,
          meta: { timestamp: expect.any(Date) },
          payload: {
            count: 1,
          },
        });
      });
    });

    describe('reconnected', () => {
      it('should return the correct action', () => {
        const act = actions.reconnected(PREFIX);

        expect(act).toEqual({
          type: `${PREFIX}::${actionTypes.WEBSOCKET_RECONNECTED}`,
          meta: { timestamp: expect.any(Date) },
        });
      });
    });

    describe('closed', () => {
      it('should return the correct action', () => {
        const act = actions.closed({ test: 'value' } as any, PREFIX);

        expect(act).toEqual({
          type: `${PREFIX}::${actionTypes.WEBSOCKET_CLOSED}`,
          meta: { timestamp: expect.any(Date) },
          payload: {
            test: 'value',
          },
        });
      });
    });

    describe('message', () => {
      it('should return the correct action', () => {
        const act = actions.message({ test: 'value' } as any, PREFIX);

        expect(act).toEqual({
          type: `${PREFIX}::${actionTypes.WEBSOCKET_MESSAGE}`,
          meta: { timestamp: expect.any(Date) },
          payload: {
            event: {
              test: 'value',
            },
            message: undefined,
            origin: undefined,
          },
        });
      });
    });

    describe('open', () => {
      it('should return the correct action', () => {
        const act = actions.open({ test: 'value' } as any, PREFIX);

        expect(act).toEqual({
          type: `${PREFIX}::${actionTypes.WEBSOCKET_OPEN}`,
          meta: { timestamp: expect.any(Date) },
          payload: {
            test: 'value',
          },
        });
      });
    });

    describe('broken', () => {
      it('should return the correct action', () => {
        const act = actions.broken(PREFIX);

        expect(act).toEqual({
          type: `${PREFIX}::${actionTypes.WEBSOCKET_BROKEN}`,
          meta: { timestamp: expect.any(Date) },
        });
      });
    });

    describe('error', () => {
      it('should return the correct action with a test action', () => {
        const act = actions.error({ type: 'TEST' } as any, new Error('test'), PREFIX);

        expect(act).toEqual({
          type: `${PREFIX}::${actionTypes.WEBSOCKET_ERROR}`,
          meta: { timestamp: expect.any(Date) },
          payload: {
            message: 'test',
            name: 'Error',
            originalAction: {
              type: 'TEST',
            },
          },
        });
      });

      it('should return the correct action with a null action', () => {
        const act = actions.error(null, new Error('test'), PREFIX);

        expect(act).toEqual({
          type: `${PREFIX}::${actionTypes.WEBSOCKET_ERROR}`,
          meta: { timestamp: expect.any(Date) },
          payload: {
            message: 'test',
            name: 'Error',
            originalAction: null,
          },
        });
      });
    });
  });
});
