import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import { Button } from './ui/button';
import { CustomInput } from './CustomInput';

const { fieldContext, formContext } = createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldComponents: {
    CustomInput,
  },
  formComponents: {
    Button,
  },
  fieldContext,
  formContext,
});
