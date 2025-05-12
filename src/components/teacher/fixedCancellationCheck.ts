// Fixed function to check if a class is cancelled on a specific day of the week
export const isClassCancelledOnDay = (classItem: any, dayIndex: number): boolean => {
  console.log(`🔍 Checking if class ${classItem.id} is cancelled on day ${dayIndex}`);
  
  // If this day is not in the recurring days, it can't be cancelled
  if (!classItem.recurring_days?.includes(dayIndex)) {
    console.log(`Day ${dayIndex} is not in recurring days for class ${classItem.id}`);
    return false;
  }
  
  // Get the exceptions for this class directly from the class object
  const exceptions = classItem.exceptions || [];
  
  // If there are no exceptions, the class is not cancelled
  if (exceptions.length === 0) {
    return false;
  }
  
  // Filter to only cancelled exceptions
  const cancelledExceptions = exceptions.filter((ex: any) => ex.exception_type === 'cancelled');
  
  // Check if any exception's day of week matches the UI day index
  for (const exception of cancelledExceptions) {
    try {
      // Get the exception date (ensure it's in YYYY-MM-DD format)
      const exceptionDateStr = exception.exception_date.split('T')[0];
      
      // Convert to Date object and get day of week
      const exceptionDate = new Date(exceptionDateStr);
      const exceptionDayOfWeek = exceptionDate.getDay(); // 0 = Sunday, 1 = Monday, etc.
      
      console.log(`Exception date ${exceptionDateStr} is day ${exceptionDayOfWeek}, checking against UI day ${dayIndex}`);
      
      // If the day of week of the exception matches the UI day index, the class is cancelled
      if (exceptionDayOfWeek === dayIndex) {
        console.log(`✅ MATCH! Class ${classItem.id} is CANCELED on day ${dayIndex} due to exception on ${exceptionDateStr}`);
        return true;
      }
    } catch (error) {
      console.error(`Error processing exception date ${exception.exception_date}:`, error);
    }
  }
  
  return false;
};
