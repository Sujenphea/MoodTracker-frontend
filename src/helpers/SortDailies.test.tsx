import { DailiesByUserId_dailiesByUserId } from "../api/__generated__/DailiesByUserId";
import { sortDailies } from "./SortDailies";

test("Order year correctly", () => {
  var testDailies: (DailiesByUserId_dailiesByUserId | null)[] = [
    {
      __typename: "Daily",
      id: "2",
      dateCreated: "01.09.2020",
      description: "John Doe",
      user: {
        __typename: "User",
        id: "1",
        name: "John Doe",
        gitHub: "johndoe",
        imageURI: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      },
    },
    {
      __typename: "Daily",
      id: "3",
      dateCreated: "01.09.2021",
      description: "John Doe",
      user: {
        __typename: "User",
        id: "1",
        name: "John Doe",
        gitHub: "johndoe",
        imageURI: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      },
    },
    {
      __typename: "Daily",
      id: "6",
      dateCreated: "01.09.2018",
      description: "John Doe",
      user: {
        __typename: "User",
        id: "1",
        name: "John Doe",
        gitHub: "johndoe",
        imageURI: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      },
    },
  ];

  var resDailies: (DailiesByUserId_dailiesByUserId | null)[] = [
    {
      __typename: "Daily",
      id: "3",
      dateCreated: "01.09.2021",
      description: "John Doe",
      user: {
        __typename: "User",
        id: "1",
        name: "John Doe",
        gitHub: "johndoe",
        imageURI: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      },
    },
    {
      __typename: "Daily",
      id: "2",
      dateCreated: "01.09.2020",
      description: "John Doe",
      user: {
        __typename: "User",
        id: "1",
        name: "John Doe",
        gitHub: "johndoe",
        imageURI: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      },
    },
    {
      __typename: "Daily",
      id: "6",
      dateCreated: "01.09.2018",
      description: "John Doe",
      user: {
        __typename: "User",
        id: "1",
        name: "John Doe",
        gitHub: "johndoe",
        imageURI: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      },
    },
  ];

  expect(sortDailies(testDailies)).toStrictEqual(resDailies);
});

test("Order month correctly", () => {
  var testDailies: (DailiesByUserId_dailiesByUserId | null)[] = [
    {
      __typename: "Daily",
      id: "2",
      dateCreated: "01.09.2020",
      description: "John Doe",
      user: {
        __typename: "User",
        id: "1",
        name: "John Doe",
        gitHub: "johndoe",
        imageURI: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      },
    },
    {
      __typename: "Daily",
      id: "3",
      dateCreated: "01.07.2020",
      description: "John Doe",
      user: {
        __typename: "User",
        id: "1",
        name: "John Doe",
        gitHub: "johndoe",
        imageURI: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      },
    },
    {
      __typename: "Daily",
      id: "6",
      dateCreated: "01.10.2020",
      description: "John Doe",
      user: {
        __typename: "User",
        id: "1",
        name: "John Doe",
        gitHub: "johndoe",
        imageURI: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      },
    },
  ];

  var resDailies: (DailiesByUserId_dailiesByUserId | null)[] = [
    {
      __typename: "Daily",
      id: "6",
      dateCreated: "01.10.2020",
      description: "John Doe",
      user: {
        __typename: "User",
        id: "1",
        name: "John Doe",
        gitHub: "johndoe",
        imageURI: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      },
    },
    {
      __typename: "Daily",
      id: "2",
      dateCreated: "01.09.2020",
      description: "John Doe",
      user: {
        __typename: "User",
        id: "1",
        name: "John Doe",
        gitHub: "johndoe",
        imageURI: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      },
    },
    {
      __typename: "Daily",
      id: "3",
      dateCreated: "01.07.2020",
      description: "John Doe",
      user: {
        __typename: "User",
        id: "1",
        name: "John Doe",
        gitHub: "johndoe",
        imageURI: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      },
    },
  ];

  expect(sortDailies(testDailies)).toStrictEqual(resDailies);
});

test("Order day correctly", () => {
  var testDailies: (DailiesByUserId_dailiesByUserId | null)[] = [
    {
      __typename: "Daily",
      id: "2",
      dateCreated: "09.09.2020",
      description: "John Doe",
      user: {
        __typename: "User",
        id: "1",
        name: "John Doe",
        gitHub: "johndoe",
        imageURI: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      },
    },
    {
      __typename: "Daily",
      id: "3",
      dateCreated: "23.09.2020",
      description: "John Doe",
      user: {
        __typename: "User",
        id: "1",
        name: "John Doe",
        gitHub: "johndoe",
        imageURI: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      },
    },
    {
      __typename: "Daily",
      id: "6",
      dateCreated: "15.09.2020",
      description: "John Doe",
      user: {
        __typename: "User",
        id: "1",
        name: "John Doe",
        gitHub: "johndoe",
        imageURI: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      },
    },
  ];

  var resDailies: (DailiesByUserId_dailiesByUserId | null)[] = [
    {
      __typename: "Daily",
      id: "3",
      dateCreated: "23.09.2020",
      description: "John Doe",
      user: {
        __typename: "User",
        id: "1",
        name: "John Doe",
        gitHub: "johndoe",
        imageURI: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      },
    },
    {
      __typename: "Daily",
      id: "6",
      dateCreated: "15.09.2020",
      description: "John Doe",
      user: {
        __typename: "User",
        id: "1",
        name: "John Doe",
        gitHub: "johndoe",
        imageURI: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      },
    },
    {
      __typename: "Daily",
      id: "2",
      dateCreated: "09.09.2020",
      description: "John Doe",
      user: {
        __typename: "User",
        id: "1",
        name: "John Doe",
        gitHub: "johndoe",
        imageURI: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      },
    },
  ];

  expect(sortDailies(testDailies)).toStrictEqual(resDailies);
});

test("Order day, month correctly", () => {
  var testDailies: (DailiesByUserId_dailiesByUserId | null)[] = [
    {
      __typename: "Daily",
      id: "2",
      dateCreated: "09.09.2020",
      description: "John Doe",
      user: {
        __typename: "User",
        id: "1",
        name: "John Doe",
        gitHub: "johndoe",
        imageURI: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      },
    },
    {
      __typename: "Daily",
      id: "3",
      dateCreated: "23.05.2020",
      description: "John Doe",
      user: {
        __typename: "User",
        id: "1",
        name: "John Doe",
        gitHub: "johndoe",
        imageURI: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      },
    },
    {
      __typename: "Daily",
      id: "6",
      dateCreated: "15.12.2020",
      description: "John Doe",
      user: {
        __typename: "User",
        id: "1",
        name: "John Doe",
        gitHub: "johndoe",
        imageURI: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      },
    },
  ];

  var resDailies: (DailiesByUserId_dailiesByUserId | null)[] = [
    {
      __typename: "Daily",
      id: "6",
      dateCreated: "15.12.2020",
      description: "John Doe",
      user: {
        __typename: "User",
        id: "1",
        name: "John Doe",
        gitHub: "johndoe",
        imageURI: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      },
    },
    {
      __typename: "Daily",
      id: "2",
      dateCreated: "09.09.2020",
      description: "John Doe",
      user: {
        __typename: "User",
        id: "1",
        name: "John Doe",
        gitHub: "johndoe",
        imageURI: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      },
    },
    {
      __typename: "Daily",
      id: "3",
      dateCreated: "23.05.2020",
      description: "John Doe",
      user: {
        __typename: "User",
        id: "1",
        name: "John Doe",
        gitHub: "johndoe",
        imageURI: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      },
    },
  ];

  expect(sortDailies(testDailies)).toStrictEqual(resDailies);
});

test("Order month, year correctly", () => {
  var testDailies: (DailiesByUserId_dailiesByUserId | null)[] = [
    {
      __typename: "Daily",
      id: "2",
      dateCreated: "01.09.1997",
      description: "John Doe",
      user: {
        __typename: "User",
        id: "1",
        name: "John Doe",
        gitHub: "johndoe",
        imageURI: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      },
    },
    {
      __typename: "Daily",
      id: "3",
      dateCreated: "01.07.2020",
      description: "John Doe",
      user: {
        __typename: "User",
        id: "1",
        name: "John Doe",
        gitHub: "johndoe",
        imageURI: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      },
    },
    {
      __typename: "Daily",
      id: "6",
      dateCreated: "01.10.2025",
      description: "John Doe",
      user: {
        __typename: "User",
        id: "1",
        name: "John Doe",
        gitHub: "johndoe",
        imageURI: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      },
    },
  ];

  var resDailies: (DailiesByUserId_dailiesByUserId | null)[] = [
    {
      __typename: "Daily",
      id: "6",
      dateCreated: "01.10.2025",
      description: "John Doe",
      user: {
        __typename: "User",
        id: "1",
        name: "John Doe",
        gitHub: "johndoe",
        imageURI: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      },
    },
    {
      __typename: "Daily",
      id: "3",
      dateCreated: "01.07.2020",
      description: "John Doe",
      user: {
        __typename: "User",
        id: "1",
        name: "John Doe",
        gitHub: "johndoe",
        imageURI: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      },
    },
    {
      __typename: "Daily",
      id: "2",
      dateCreated: "01.09.1997",
      description: "John Doe",
      user: {
        __typename: "User",
        id: "1",
        name: "John Doe",
        gitHub: "johndoe",
        imageURI: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      },
    },
  ];

  expect(sortDailies(testDailies)).toStrictEqual(resDailies);
});

test("Order day, month, year correctly", () => {
  var testDailies: (DailiesByUserId_dailiesByUserId | null)[] = [
    {
      __typename: "Daily",
      id: "2",
      dateCreated: "16.09.1997",
      description: "John Doe",
      user: {
        __typename: "User",
        id: "1",
        name: "John Doe",
        gitHub: "johndoe",
        imageURI: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      },
    },
    {
      __typename: "Daily",
      id: "3",
      dateCreated: "12.07.2020",
      description: "John Doe",
      user: {
        __typename: "User",
        id: "1",
        name: "John Doe",
        gitHub: "johndoe",
        imageURI: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      },
    },
    {
      __typename: "Daily",
      id: "2",
      dateCreated: "28.09.1997",
      description: "John Doe",
      user: {
        __typename: "User",
        id: "1",
        name: "John Doe",
        gitHub: "johndoe",
        imageURI: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      },
    },
    {
      __typename: "Daily",
      id: "6",
      dateCreated: "26.10.2025",
      description: "John Doe",
      user: {
        __typename: "User",
        id: "1",
        name: "John Doe",
        gitHub: "johndoe",
        imageURI: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      },
    },
    {
      __typename: "Daily",
      id: "6",
      dateCreated: "26.04.2025",
      description: "John Doe",
      user: {
        __typename: "User",
        id: "1",
        name: "John Doe",
        gitHub: "johndoe",
        imageURI: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      },
    },
  ];

  var resDailies: (DailiesByUserId_dailiesByUserId | null)[] = [
    {
      __typename: "Daily",
      id: "6",
      dateCreated: "26.10.2025",
      description: "John Doe",
      user: {
        __typename: "User",
        id: "1",
        name: "John Doe",
        gitHub: "johndoe",
        imageURI: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      },
    },
    {
      __typename: "Daily",
      id: "6",
      dateCreated: "26.04.2025",
      description: "John Doe",
      user: {
        __typename: "User",
        id: "1",
        name: "John Doe",
        gitHub: "johndoe",
        imageURI: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      },
    },
    {
      __typename: "Daily",
      id: "3",
      dateCreated: "12.07.2020",
      description: "John Doe",
      user: {
        __typename: "User",
        id: "1",
        name: "John Doe",
        gitHub: "johndoe",
        imageURI: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      },
    },
    {
      __typename: "Daily",
      id: "2",
      dateCreated: "28.09.1997",
      description: "John Doe",
      user: {
        __typename: "User",
        id: "1",
        name: "John Doe",
        gitHub: "johndoe",
        imageURI: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      },
    },
    {
      __typename: "Daily",
      id: "2",
      dateCreated: "16.09.1997",
      description: "John Doe",
      user: {
        __typename: "User",
        id: "1",
        name: "John Doe",
        gitHub: "johndoe",
        imageURI: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      },
    },
  ];

  expect(sortDailies(testDailies)).toStrictEqual(resDailies);
});
