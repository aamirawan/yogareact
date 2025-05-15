// Format date to YYYY-MM-DD
export const formatDateToString = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

// Get day of week as number (0-6, where 0 is Sunday)
export const getDayOfWeekNumber = (date: Date): number => {
  return date.getDay();
};

// Get the next n days from a given date
export const getNextDays = (date: Date, days: number): Date[] => {
  const result: Date[] = [];
  
  for (let i = 0; i < days; i++) {
    const nextDate = new Date(date);
    nextDate.setDate(date.getDate() + i);
    result.push(nextDate);
  }
  
  return result;
};

// Get day of week in short format (MON, TUE, etc.)
export const getDayOfWeekShort = (date: Date): string => {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  return days[date.getDay()];
};

// Format date for display (e.g., "Saturday, May 10")
export const formatDateForDisplay = (date: Date): string => {
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
};

// Group classes by date
export const groupClassesByDate = (classes: any[]): Record<string, any[]> => {
  return classes.reduce((acc: Record<string, any[]>, cls: any) => {
    const date = cls.start_date || cls.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(cls);
    return acc;
  }, {});
};

// Format time from 24-hour format (HH:MM) to AM/PM format
export const formatTimeTo12Hour = (time: string): string => {
  if (!time) return '';
  
  // Handle case where time might already have AM/PM
  if (time.toLowerCase().includes('am') || time.toLowerCase().includes('pm')) {
    return time;
  }
  
  try {
    // Extract hours and minutes
    const [hoursStr, minutesStr] = time.split(':');
    const hours = parseInt(hoursStr, 10);
    const minutes = minutesStr || '00';
    
    if (isNaN(hours)) return time;
    
    const period = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12; // Convert 0 to 12 for 12 AM
    
    return `${hours12}:${minutes} ${period}`;
  } catch (error) {
    console.error('Error formatting time:', error);
    return time;
  }
};

// Create class instances for recurring classes based on selected date
export const createClassInstancesForDate = (classes: any[], selectedDate: Date): any[] => {
  const selectedDayOfWeek = getDayOfWeekNumber(selectedDate);
  const selectedDateStr = formatDateToString(selectedDate);
  
  return classes.flatMap(cls => {
    // If the class has recurring_days field and it includes the selected day of week
    if (cls.recurring_days && Array.isArray(cls.recurring_days) && cls.recurring_days.includes(selectedDayOfWeek)) {
      // Create a class instance for this date
      return [{
        ...cls,
        id: `${cls.id || cls.class_id}_${selectedDateStr}`,
        date: selectedDateStr,
        start_date: selectedDateStr
      }];
    } 
    // If the class has a specific date that matches the selected date
    else if ((cls.start_date === selectedDateStr) || (cls.date === selectedDateStr)) {
      return [cls];
    }
    // Otherwise, don't include this class
    return [];
  });
};
