import { useState } from 'react';

import { Validation } from '@/presentation/protocols';

interface Props {
  name: string;
  initialValue?: any;
}

const useInputState = ({ name, initialValue = '' }: Props) => {
  const [state, setState] = useState(initialValue);
  const [error, setError] = useState('');

  const changeState = (value: any): void => {
    setError('');
    setState(value);
  };

  const findError = (erros: Validation.ValidationErrors) => {
    Object.keys(erros).forEach((key) => {
      if (key === name) {
        setError(erros[key]);
      }
    });
  };

  return {
    name,
    value: state,
    set: changeState,
    setError: findError,
    error
  };
};

export default useInputState;
