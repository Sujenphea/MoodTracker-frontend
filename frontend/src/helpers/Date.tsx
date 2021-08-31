export const convertDate = (date: string): string => {
  const dates: string[] = date.split(".");
  const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month: string = months[Number.parseInt(dates[1]) - 1];

  return dates[0] + " " + month + " " + dates[2];
};

export const IsToday = (date: string): boolean => {
  const dates: string[] = date.split(".");
  const today = new Date(Date.now());

  // today.getmonth is 0 indexed
  if (Number.parseInt(dates[0]) === today.getDate()) {
    return true;
  }

  return false;
};
