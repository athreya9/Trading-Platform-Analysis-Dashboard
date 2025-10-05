export const isMarketOpen = (): boolean => {
  const now = new Date();
  const day = now.getDay(); // Sunday is 0, Monday is 1, etc.
  const hours = now.getHours();
  const minutes = now.getMinutes();

  // Market is open on weekdays (Monday to Friday)
  const isWeekday = day >= 1 && day <= 5;

  // Market is open between 9:15 AM and 3:30 PM
  const marketOpen = (hours > 9 || (hours === 9 && minutes >= 15));
  const marketClose = (hours < 15 || (hours === 15 && minutes <= 30));

  return isWeekday && marketOpen && marketClose;
};