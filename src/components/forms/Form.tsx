import type { FC, HTMLAttributes } from 'react';

import { FormProvider, type UseFormReturn } from 'react-hook-form';

import { cn } from '@/lib/utils';

interface FormProps extends HTMLAttributes<HTMLFormElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: any) => void;
}

export const Form: FC<FormProps> = ({
  form,
  onSubmit,
  className,
  ...props
}) => {
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
        className={cn('space-y-4', className)}
      />
    </FormProvider>
  );
};
