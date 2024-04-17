import { describe, it, expect } from 'vitest';
import { calculateDaysBetween } from './utils.ts';

describe('calculateDaysBetween', () => {
    it('returns 0 when the input date is the current date', () => {
        const currentDate = (new Date()).getTime();
        const result = calculateDaysBetween(currentDate);
        expect(result).toBe(0);
    });

    it('returns the correct number of days for past dates', () => {
        // Calculate a date 10 days in the past
        const tenDaysAgo = (new Date()).getTime() - (10 * 24 * 60 * 60 * 1000);
        const result = calculateDaysBetween(tenDaysAgo);
        expect(result).toBe(10);
    });

    it('returns the correct number of days for future dates', () => {
        // Calculate a date 5 days in the future
        const fiveDaysFromNow = (new Date()).getTime() + (5 * 24 * 60 * 60 * 1000);
        const result = calculateDaysBetween(fiveDaysFromNow);
        expect(result).toBe(5);
    });

    it('returns a rounded number of days', () => {
        // Calculate a date 2.5 days in the past
        const twoAndHalfDaysAgo = (new Date()).getTime() - (2.5 * 24 * 60 * 60 * 1000);
        const result = calculateDaysBetween(twoAndHalfDaysAgo);
        expect(result).toBe(3);
    });

    it('handles edge cases correctly', () => {
        // Calculate a date far in the past
        const longTimeAgo = (new Date()).getTime() - (365 * 24 * 60 * 60 * 1000);
        const result = calculateDaysBetween(longTimeAgo);
        expect(result).toBe(365);

        // Calculate a date far in the future
        const longTimeAhead = (new Date()).getTime() + (730 * 24 * 60 * 60 * 1000);
        const result2 = calculateDaysBetween(longTimeAhead);
        expect(result2).toBe(730);
    });
});
