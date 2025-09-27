
export const checkIndianMarketHours = (date: Date): boolean => {
  const now = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  const day = now.getDay();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  // Monday to Friday
  if (day < 1 || day > 5) {
    return false;
  }

  // Market open from 9:15 AM to 3:30 PM
  if (hours > 9 || (hours === 9 && minutes >= 15)) {
    if (hours < 15 || (hours === 15 && minutes < 30)) {
      return true;
    }
  }

  return false;
};
