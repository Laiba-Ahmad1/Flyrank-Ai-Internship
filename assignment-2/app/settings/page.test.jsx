import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SettingsPage from "./page";

describe("SettingsPage", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("submits successfully with valid values", async () => {
    jest.spyOn(Math, "random").mockReturnValue(0.9);
    const user = userEvent.setup();
    render(<SettingsPage />);

    await user.type(screen.getByLabelText(/display name/i), "Alicia");
    await user.type(screen.getByLabelText(/email/i), "alicia@example.com");
    await user.type(screen.getByLabelText(/password/i), "Password1");
    await user.click(screen.getByRole("button", { name: /save changes/i }));

    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent(
        /updated successfully/i,
      );
    });
  });

  it("shows an error for an invalid email", async () => {
    const user = userEvent.setup();
    render(<SettingsPage />);

    await user.type(screen.getByLabelText(/display name/i), "Alicia");
    await user.type(screen.getByLabelText(/email/i), "invalid-email");
    await user.tab();

    expect(screen.getByText(/valid email address/i)).toBeInTheDocument();
  });

  it("shows an error for a short password", async () => {
    const user = userEvent.setup();
    render(<SettingsPage />);

    await user.type(screen.getByLabelText(/display name/i), "Alicia");
    await user.type(screen.getByLabelText(/email/i), "alicia@example.com");
    await user.type(screen.getByLabelText(/password/i), "short");
    await user.tab();

    expect(
      screen.getByText(/password must be at least 8 characters/i),
    ).toBeInTheDocument();
  });

  it("shows an error for an empty name", async () => {
    const user = userEvent.setup();
    render(<SettingsPage />);

    const nameInput = screen.getByLabelText(/display name/i);
    await user.click(nameInput);
    await user.tab();

    expect(screen.getByText(/display name is required/i)).toBeInTheDocument();
  });
});
