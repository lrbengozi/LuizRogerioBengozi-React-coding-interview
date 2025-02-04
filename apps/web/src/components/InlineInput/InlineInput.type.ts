type InlineInputVariant = 'subtitle1' | 'phone' | 'email';

export type InlineInputProps = {
  initialValue: string;
  variant: InlineInputVariant;
  onSubmit: (value: string) => void;
};
