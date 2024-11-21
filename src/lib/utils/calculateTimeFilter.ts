import { subDays, subHours, subMonths, subYears } from "date-fns";

export const calculateTimeFilter = (time: string) => {
    const now = new Date();
    switch (time) {
      case '2y':
        return subYears(now, 2) // 2 years ago
      case '1y':
        return subYears(now, 1) // 1 year ago
      case '6m':
        return subMonths(now, 6) // 6 months ago
      case '3m':
        return subMonths(now, 3) // 3 months ago
      case '1m':
        return subMonths(now, 1) // 1 month ago
      case '14d':
        return subDays(now, 14); // 14 days ago
      case '7d':
        return subDays(now, 7); // 7 days ago
      case '1d':
        return subDays(now, 1); // 1 day ago
      case '12h':
        return subHours(now, 12); // 12 hours ago
      case '8h':
        return subHours(now, 9); // 8 hours ago
      case '1h':
        return subHours(now, 2); // 1 hour ago

      default:
        return null;
    }
  };