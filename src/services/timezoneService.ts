// Timezone Service - Handles Jamaica timezone (EST/EDT) formatting and conversions
// Jamaica uses Eastern Standard Time (EST) year-round (UTC-5)
// Note: Jamaica does not observe Daylight Saving Time

export type TimezoneType = 'Jamaica' | 'UTC' | 'Local';

class TimezoneService {
  readonly JAMAICA_TIMEZONE = 'America/Jamaica'; // IANA timezone identifier
  readonly JAMAICA_UTC_OFFSET = -5; // Jamaica is UTC-5 (EST year-round)

  /**
   * Get current Jamaica time as a Date object
   */
  getJamaicaTime(): Date {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: this.JAMAICA_TIMEZONE,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });

    const parts = formatter.formatToParts(new Date());
    const values: Record<string, string> = {};

    parts.forEach((part) => {
      if (part.type !== 'literal') {
        values[part.type] = part.value;
      }
    });

    return new Date(
      `${values.year}-${values.month}-${values.day}T${values.hour}:${values.minute}:${values.second}Z`
    );
  }

  /**
   * Format a date in Jamaica timezone
   */
  formatForJamaica(
    date: Date,
    options: Intl.DateTimeFormatOptions = {}
  ): string {
    const defaultOptions: Intl.DateTimeFormatOptions = {
      timeZone: this.JAMAICA_TIMEZONE,
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      meridiem: 'short',
      ...options,
    };

    return new Intl.DateTimeFormat('en-US', defaultOptions).format(date);
  }

  /**
   * Format a date with time in Jamaica timezone
   */
  formatWithTimeJamaica(date: Date): string {
    return this.formatForJamaica(date, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }

  /**
   * Format just the date in Jamaica timezone
   */
  formatDateOnlyJamaica(date: Date): string {
    return this.formatForJamaica(date, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: this.JAMAICA_TIMEZONE,
    });
  }

  /**
   * Format just the time in Jamaica timezone
   */
  formatTimeOnlyJamaica(date: Date): string {
    return this.formatForJamaica(date, {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: this.JAMAICA_TIMEZONE,
    });
  }

  /**
   * Get Jamaica timezone offset string
   */
  getJamaicaOffsetString(): string {
    return 'EST (UTC-5)';
  }

  /**
   * Check if a given time is during business hours in Jamaica (9 AM - 5 PM EST)
   */
  isBusinessHoursJamaica(date: Date = new Date()): boolean {
    const jamaicaTime = this.getJamaicaTime();
    const hour = jamaicaTime.getHours();
    return hour >= 9 && hour < 17; // 9 AM to 5 PM
  }

  /**
   * Get hours until/since business hours in Jamaica
   */
  getHoursToNextBusinessHours(date: Date = new Date()): number {
    const jamaicaTime = this.getJamaicaTime();
    const hour = jamaicaTime.getHours();

    if (hour >= 9 && hour < 17) {
      // During business hours, return 0
      return 0;
    } else if (hour < 9) {
      // Before business hours
      return 9 - hour;
    } else {
      // After business hours (5 PM - 11:59 PM)
      // Hours until next day 9 AM
      return 24 - hour + 9;
    }
  }

  /**
   * Convert a date from another timezone to Jamaica time
   * Note: JavaScript Date objects are always in local time, so this uses IANA formatting
   */
  convertToJamaicaTime(date: Date): string {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: this.JAMAICA_TIMEZONE,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });

    return formatter.format(date);
  }

  /**
   * Create a relative time string in Jamaica timezone (e.g., "2 hours ago")
   */
  getRelativeTimeJamaica(date: Date): string {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return 'just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else {
      return this.formatDateOnlyJamaica(date);
    }
  }
}

export const timezoneService = new TimezoneService();
