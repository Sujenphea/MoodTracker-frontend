import { DailiesByUserId_dailiesByUserId } from "../api/__generated__/DailiesByUserId";

export const sortDailies = (
  dailies: (DailiesByUserId_dailiesByUserId | null)[]
) => {
  const n = dailies.slice();
  n.sort(
    (
      a: DailiesByUserId_dailiesByUserId | null,
      b: DailiesByUserId_dailiesByUserId | null
    ) => {
      if (a === null || b === null) {
        return 0;
      }

      // sort by year
      if (a.dateCreated.slice(6, 10) > b.dateCreated.slice(6, 10)) {
        return -1;
      }

      if (a.dateCreated.slice(6, 10) < b.dateCreated.slice(6, 10)) {
        return 1;
      }

      // sort by month
      if (a.dateCreated.slice(3, 5) > b.dateCreated.slice(3, 5)) {
        return -1;
      }

      if (a.dateCreated.slice(3, 5) < b.dateCreated.slice(3, 5)) {
        return 1;
      }

      // sort by day
      if (a.dateCreated.slice(0, 2) > b.dateCreated.slice(0, 2)) {
        return -1;
      }

      if (a.dateCreated.slice(0, 2) < b.dateCreated.slice(0, 2)) {
        return 1;
      }

      return 0;
    }
  );

  return n;
};
