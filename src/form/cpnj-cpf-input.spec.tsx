import "@testing-library/jest-dom";

import { render, screen, waitFor } from "@testing-library/react";
import { CnpjCpfInput } from "./cpnj-cpf-input";
import { describe, test, expect } from "vitest";
import { userEvent } from "@testing-library/user-event";

describe("CnpjCpfInput", () => {
  test("renders without errors", () => {
    render(<CnpjCpfInput />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
  });

  test("renders CNPJ", async () => {
    render(<CnpjCpfInput />);
    const inputElement = screen.getByRole("textbox");
    await userEvent.type(inputElement, "96051695000100", { initialSelectionStart: 0 });

    await waitFor(()=> expect(inputElement).toHaveValue("96.051.695/0001-00"));
  });

  test("renders CPF", async () => {
    render(<CnpjCpfInput />);
    const inputElement = screen.getByRole("textbox");
    await userEvent.type(inputElement, "78556384072", { initialSelectionStart: 0 });
    
    await waitFor(()=> expect(inputElement).toHaveValue("785.563.840-72"));
  });
});
