import "@testing-library/jest-dom";

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { TestForm } from "./form";
import { vi, describe, test, expect } from "vitest";

describe("TestForm", () => {
  test("renders form with input field", () => {
    render(<TestForm onSubmit={() => {}} />);

    const inputElement = screen.getByRole("textbox", { name: /CPF\/CNPJ/ });
    expect(inputElement).toBeInTheDocument();
  });

  test("calls onSubmit with form data when submitted", async () => {
    const onSubmitMock = vi.fn();
    render(<TestForm onSubmit={onSubmitMock} />);

    const inputElement = screen.getByRole("textbox", { name: /CPF\/CNPJ/ });
    const submitButton = screen.getByRole("button", { name: "Submit" });

    await userEvent.type(inputElement, "78556384072");

    await waitFor(() => expect(inputElement).toHaveValue("785.563.840-72"));

    fireEvent.click(submitButton);

    expect(onSubmitMock).toHaveBeenCalledWith({ document: "785.563.840-72" });
  });
});
