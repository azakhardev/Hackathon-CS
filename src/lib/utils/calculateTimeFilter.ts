import { subDays, subHours, subMonths, subYears } from "date-fns";

export const calculateTimeFilter = (time: string) => {
    const now = new Date();
    switch (time) {
      case '2y':
        return subYears(now, 2) 
      case '1y':
        return subYears(now, 1) 
      case '6m':
        return subMonths(now, 6) 
      case '3m':
        return subMonths(now, 3) 
      case '1m':
        return subMonths(now, 1) 
      case '14d':
        return subDays(now, 14); 
      case '7d':
        return subDays(now, 7); 
      case '1d':
        return subDays(now, 1); 
      case '12h':
        return subHours(now, 12); 
      case '8h':
        return subHours(now, 9); 
      case '1h':
        return subHours(now, 2); 

      default:
        return null;
    }
  };