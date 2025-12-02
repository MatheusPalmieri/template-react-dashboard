import type { ComponentPropsWithoutRef, FC } from 'react';

import type { UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input as InputUI,
} from '../ui';

interface InputProps
  extends Omit<ComponentPropsWithoutRef<'input'>, 'form' | 'name'> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  name: string;
  label?: string;
}

export const Input: FC<InputProps> = ({ form, name, label, ...props }) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}

          <FormControl>
            <InputUI {...field} {...props} />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
