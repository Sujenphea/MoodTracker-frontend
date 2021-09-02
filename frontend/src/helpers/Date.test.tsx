import { convertDate } from "./Date";

test("Converting 31.08.2021 equals 31 August 2021", () => {
  expect(convertDate("31.08.2021")).toBe("31 August 2021");
});
