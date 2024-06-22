// tests/currencyConverter.test.js
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { fetchRatio } from '../../src/api';

global.import.meta = {
    env: {
      VITE_CONVERTER_URL: import.meta.env.VITE_CONVERTER_URL,
      VITE_CONVERTER_API_KEY: import.meta.env.VITE_CONVERTER_API_KEY,
    },
  };

describe('fetchRatio', () => {
    beforeEach(() => {
      global.fetch = jest.fn();
    });
  
    afterEach(() => {
      global.fetch.mockClear();
    });
  
    it('should fetch ratio for given currencies', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          data: [{ base: 'USD', target: 'EUR', rate: 0.85 }],
        }),
      });
  
      const ratio = await fetchRatio('USD', 'EUR');
      expect(ratio).toEqual([{ base: 'USD', target: 'EUR', rate: 0.85 }]);
    });
  
    it('should handle fetch error', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      });
  
      const ratio = await fetchRatio('USD', 'EUR');
      expect(ratio).toBeUndefined();
    });
  });