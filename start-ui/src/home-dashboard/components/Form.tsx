import {
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

import { formStyles, formStyles as styles } from "../../styles/formStyles";

import { FormInputs, Errors } from "../models/form-model";

import { BqButton, BqStatus } from "@bee-q/react";
import Tooltip from "../../shared/Tooltip";

interface Props {
  register: UseFormRegister<FormInputs>;
  handleSubmit: UseFormHandleSubmit<FormInputs>;
  onSubmit: SubmitHandler<FormInputs>;
  sizes: string[];
  errors: Errors;
  buttonText: string;
}

const Form = ({
  register,
  handleSubmit,
  sizes,
  errors,
  onSubmit,
  buttonText,
}: Props) => {
  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.divContainer}>
        <label className={styles.label}>
          Name:
          <Tooltip msg="Write the name of your pizza" />
        </label>
        <input
          {...register("name", { required: true })}
          className={styles.input}
        />

        {errors.name && (
          <BqStatus type="danger">This field is required</BqStatus>
        )}
      </div>

      <div className={styles.divContainer}>
        <label className={styles.label}>
          Ingredients:{" "}
          <Tooltip msg="Now add your favorite ingredients" placement="right" />
        </label>
        <input
          {...register("ingredients", { required: true })}
          className={styles.input}
        />
        {errors.ingredients && (
          <BqStatus type="danger">This field is required</BqStatus>
        )}
      </div>

      <div className={styles.divContainer}>
        <label className={styles.label}>
          Crust:{" "}
          <Tooltip
            msg="Each crust defines the size of the pizza"
            placement="left"
          />
        </label>
        <select
          {...register("crust", { required: true })}
          className={styles.select}
        >
          <option value="">Please choose an option</option>
          <option value="Thin">Thin</option>
          <option value="Regular">Regular</option>
          <option value="Fluffy">Fluffy</option>
        </select>
        {errors.crust && (
          <BqStatus type="danger">This field is required</BqStatus>
        )}
      </div>

      <div className={styles.divContainer}>
        <label className={styles.label}>
          Price: <Tooltip msg="No comment" placement="bottom" />
        </label>
        <input
          {...register("price", { required: true })}
          className={styles.input}
        />
        {errors.price && (
          <BqStatus type="danger">This field is required</BqStatus>
        )}
      </div>

      <div className={styles.divContainer}>
        <label className={styles.label}>
          Size:{" "}
          <Tooltip msg="Lorem ipsum dolor sit amet, consectetur adipiscing elit" />
        </label>
        <select
          {...register("size", { required: true })}
          className={styles.select}
        >
          <option value="">Please choose an option</option>
          {sizes.map((size, index) => (
            <option key={index} value={size}>
              {size}
            </option>
          ))}
        </select>
        {errors.size && (
          <BqStatus type="danger">This field is required</BqStatus>
        )}
      </div>

      <BqButton type="submit">{buttonText}</BqButton>
    </form>
  );
};

export default Form;
