import useSizes from "../../hooks/useSizes";
import { AxiosError } from "../../services/api-client";
import pizzaService, { Pizza } from "../../services/pizza-service";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormInputs } from "../models/form-model";

import Form from "../components/Form";
import { useEffect } from "react";

interface Props {
  pizzas: Pizza[];
  setPizzas: React.Dispatch<React.SetStateAction<Pizza[]>>;
  defaultValues?: Pizza;
  updatePizza: (pizza: Pizza) => void;
}

const FormContainer = ({
  setPizzas,
  pizzas,
  defaultValues,
  updatePizza,
}: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormInputs>({
    defaultValues,
  });

  const crust = watch("crust");

  const { sizes, setSizes } = useSizes(crust);

  useEffect(() => {
    if (defaultValues) {
      Object.entries(defaultValues).forEach(([key, value]) => {
        setValue(key as keyof FormInputs, value as string | number);
      });
    }
  }, [defaultValues, setValue]);

  const onSubmit: SubmitHandler<FormInputs> = (data: FormInputs) => {
    const originalPizzas = [...pizzas];

    if (defaultValues) {
      const updatedPizza = { ...defaultValues, ...data };
      setSizes([defaultValues.size]);
      console.log("size", defaultValues);
      updatePizza(updatedPizza);
      reset();
    } else {
      const newPizza: Pizza = {
        id: pizzas.length + 1,
        ...data,
        size: data.size,
      };

      pizzaService
        .create<Pizza>(newPizza)
        .then(({ data: savedPizza }) => {
          setPizzas([savedPizza, ...pizzas]);
          reset();
        })
        .catch((e: AxiosError) => {
          console.log(e.message);
          setPizzas(originalPizzas);
        });
    }
  };

  const buttonText = defaultValues ? "Update Pizza" : "Add Pizza";

  return (
    <Form
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      sizes={sizes}
      errors={errors}
      buttonText={buttonText}
    />
  );
};

export default FormContainer;
