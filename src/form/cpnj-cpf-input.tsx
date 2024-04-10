import { InputMask } from '@react-input/mask';
import { Input, InputProps } from './input';
import { cpf } from 'cpf-cnpj-validator';
import React from 'react';

const CNPJ_MASK = '__.___.___/____-__';
const CPF_MASK = '___.___.___-__';

const CnpjCpfInput = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const modifyToCNPJ = (input: string) => {
    const digits = input.replace(/\D/, '');
    const isCPF = cpf.isValid(digits.replace(/\D/, ''));

    return {
      mask: isCPF ? CPF_MASK : undefined,
      replacement: { _: /\d/ },
      showMask: true,
    };
  };

  return (
    <InputMask
      component={Input}
      mask={CNPJ_MASK}
      modify={modifyToCNPJ}
      ref={ref}
      replacement={{ _: /\d/ }}
      separate
      showMask
      {...props}
    />
  );
});

CnpjCpfInput.displayName = 'CnpjCpfInput';

export { CnpjCpfInput };
