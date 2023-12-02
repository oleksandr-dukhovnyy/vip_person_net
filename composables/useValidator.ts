type Validator = (
  value: Field['refedValue']['value']
) => boolean | string | void;

interface Field {
  name: string;
  refedValue: Ref<string | number | boolean>;
  validate: keyof typeof presets | Validator;
  error?: string;
  ['non-required']?: boolean;
}

interface Config {
  fields: Field[];
  resetErrorByFieldChange?: boolean;
}

type Val = string | number | boolean;

type ErrorsList = {
  [key: string]: (string | boolean)[];
};

const presets = {
  required: (val: Val) => !!val,
  email: (val: Val) => {
    if (typeof val === 'string') {
      return /^[^@]+@[^.]+\.[^.]+.*/.test(val);
    }
  },
  phone: (val: Val) => {
    if (typeof val === 'string') {
      return /^\+380[345679]\d{8}$/.test(val.replace(/\D/g, ''));
    }
  },
};

export default function useValidator(params: Config) {
  const hasErrors = ref<boolean>(false);
  const errors = ref<ErrorsList>({});

  function validate(): boolean {
    reset();

    const fieldsWithErrors = params.fields
      .map((f) => {
        if (typeof f.validate === 'string') {
          if (f['non-required'] && !f.refedValue.value) return [f, true];

          if (f.validate in presets) {
            return [f, presets[f.validate](f.refedValue.value)];
          } else {
            console.warn(`Validator "${f.validate}" is not exists in presets`);
            return [f, true];
          }
        }

        return [f, f.validate(f.refedValue.value)];
      })
      .filter(
        (result) =>
          (typeof result[1] === 'string' || result[1] === false) && !!result[0]
      )
      .map((res) => {
        const f = res[0] as Field;
        const validationResult = res[1] as boolean | string;

        const errorText =
          typeof validationResult === 'string'
            ? validationResult
            : f.error || true;

        if (errorText) {
          if (!(f.name in errors)) {
            errors.value[f.name] = [];
          }

          errors.value[f.name].push(errorText);

          if (params.resetErrorByFieldChange) {
            watch(f.refedValue, () => delete errors.value[f.name]);
          }
        }
      });

    hasErrors.value = fieldsWithErrors.length > 0;

    return hasErrors.value;
  }

  function reset(fieldName?: string) {
    if (fieldName) {
      delete errors.value[fieldName];
    } else {
      errors.value = {};
    }

    hasErrors.value = false;
  }

  return {
    validate,
    reset,
    errors,
    hasErrors,
    fields: params.fields,
  };
}

export function useField(
  fieldName: string,
  validator: ReturnType<typeof useValidator>
) {
  return defineComponent({
    setup(_, { slots }) {
      return () => {
        return slots.default?.({
          hasErrors: fieldName in validator.errors.value,
          error: validator.errors.value[fieldName]?.filter(
            (v) => typeof v !== 'boolean'
          ),
        });
      };
    },
  });
}

export function useFieldFactory(validator: ReturnType<typeof useValidator>) {
  return (fieldName: string) => useField(fieldName, validator);
}
