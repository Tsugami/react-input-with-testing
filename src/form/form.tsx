import { CnpjCpfInput } from "./cpnj-cpf-input";

import { zodResolver } from "@hookform/resolvers/zod";

import { cpf, cnpj } from "cpf-cnpj-validator";

import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  document: z
    .string({
      required_error: "CPF/CNPJ é obrigatório.",
    })
    .refine(
      (data) => {
        const digits = data.replace(/\D/g, "");
        return digits.length > 11 ? cnpj.isValid(digits) : cpf.isValid(digits);
      },
      { message: "CPF/CNPJ inválido." }
    ),
});

type Schema = z.infer<typeof formSchema>;

interface TestFormProps {
  onSubmit: (data: Schema) => void;
}

export const TestForm = ({ onSubmit }: TestFormProps) => {
  const form = useForm<Schema>({ resolver: zodResolver(formSchema) });

  return (
    <form
      className="max-w-lg w-full flex flex-col gap-3"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div>
        <label htmlFor="document">CPF/CNPJ</label>
        <CnpjCpfInput id="document" {...form.register("document")} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};
