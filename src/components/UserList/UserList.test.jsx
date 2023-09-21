import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, test } from "vitest";
import UserList from "./UserList";
import withUserContext from "../../hocs/withUserContext";
import userEvent from "@testing-library/user-event";

const TEST_USERS = [
  {
    id: 1,
    name: "Leanne Graham"
  },
  {
    id: 2,
    name: "John Doe"
  },
  {
    id: 3,
    name: "Jane Doe"
  },
  {
    id: 4,
    name: "Kaito Kid"
  },
  {
    id: 5,
    name: "Lyse Hext"
  },
  {
    id: 6,
    name: "Urianger Augurelt"
  },
];

const renderComponent = (initialContextValues = {}) => {
  const ComponentWithContext = withUserContext(UserList);
  const contextValues = {
    users: TEST_USERS,
    ...initialContextValues,
  }

  return render(
    <ComponentWithContext contextInitialValue={contextValues} />
  )
};

describe("UserList component test", () => {
  it("should render paginated list of user names", async () => {
    renderComponent();

    const EXPECTED_PAGE1_USERS = TEST_USERS.slice(0,5);
    const EXPECTED_PAGE2_USERS = TEST_USERS.slice(5, TEST_USERS.length);

    // Page 1 test
    expect(screen.queryByText("Page: 1/2")).toBeInTheDocument();
    EXPECTED_PAGE1_USERS.forEach((user) => {
      expect(screen.queryByText(user.name)).toBeInTheDocument();
    })

    // Page 2 test
    userEvent.click(screen.getByRole("button", { name: ">" }));
    await waitFor(() => {
      expect(screen.queryByText("Page: 2/2")).toBeInTheDocument();
      EXPECTED_PAGE2_USERS.forEach((user) => {
        expect(screen.queryByText(user.name)).toBeInTheDocument();
      });
    });


    // Go back to Page 1 test
    userEvent.click(screen.getByRole("button", { name: "<" }));
    await waitFor(() => {
      expect(screen.queryByText("Page: 1/2")).toBeInTheDocument();
      EXPECTED_PAGE1_USERS.forEach((user) => {
        expect(screen.queryByText(user.name)).toBeInTheDocument();
      });
    });
  });

  test.each`
  searchFilter  | expectedNames
  ${'doe'}      | ${['John Doe', 'Jane Doe']}
  ${'anne'}     | ${['Leanne Graham']}
  `('Given that the search filter is ($searchFilter) -> result: $expectedNames', ({ searchFilter, expectedNames }) => {
    renderComponent();

    userEvent.type(screen.getByRole("textbox"), searchFilter);

    expectedNames.forEach((username) => {
      expect(screen.queryByText(username)).toBeInTheDocument();
    })
  });
});
