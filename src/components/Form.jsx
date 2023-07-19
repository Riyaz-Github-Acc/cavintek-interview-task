/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import Select from "react-select";
import makeAnimated from "react-select/animated";

const Form = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    control,
    reset,
  } = useForm();

  const password = watch("password");

  const options = [
    { value: "IN", label: "India" },
    { value: "UK", label: "United Kingdom" },
    { value: "CA", label: "Canada" },
  ];

  const animatedComponents = makeAnimated();
  const colorStyles = {
    control: (base) => ({
      ...base,
      height: 50,
      minHeight: 50,
      color: "red",
    }),

    valueContainer: (provided) => ({
      ...provided,
      height: "50px",
      padding: "0 15px",
      paddingTop: 0,
      paddingBottom: 0,
    }),

    input: (provided) => ({
      ...provided,
      margin: "0px",
    }),

    indicatorsContainer: (provided) => ({
      ...provided,
      height: "50px",
    }),
  };

  const onSubmit = (data) => {
    console.log(data);
    window.alert("User Registered Successfully");
    reset();
  };

  return (
    <div className="formComponent">
      <h1>Registration Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            id="name"
            type="text"
            placeholder="Name*"
            {...register("name", { required: true })}
          />
          <div className="error">
            {errors.name?.type === "required" && "Name is required"}
          </div>
        </div>

        <div>
          <input
            id="mob"
            type="tel"
            placeholder="Mobile Number*"
            {...register("mobile", {
              required: true,
              pattern: /^[0-9+-]+$/,
            })}
          />
          <div className="error">
            {errors.mobile?.type === "required" && "Mobile number is required"}
            {errors.mobile?.type === "pattern" &&
              "Only numbers, + and - are allowed"}
          </div>
        </div>

        <div>
          <input
            id="email"
            type="email"
            placeholder="Email*"
            {...register("email", {
              required: true,
              pattern: /^[a-zA-Z0-9_.+-]+@[a-z]+\.[a-z]{2,3}$/,
            })}
          />
          <div className="error">
            {errors.email?.type === "required" && "Email is required"}
            {errors.email?.type === "pattern" && "Not a valid email address"}
          </div>
        </div>

        <div>
          <input
            id="password"
            type="password"
            placeholder="Password*"
            {...register("password", {
              required: true,
              pattern:
                /^(?=.*[@#$])(?=.*[0-9]{4,})(?=.*[A-Z]{2,})(?=.*[a-z]{2,}).*$/,
            })}
          />
          <div className="error">
            {errors.password?.type === "required" && "Password is required"}
            {errors.password?.type === "pattern" && (
              <p>
                Password must contain at least 1 special character, <br /> 4
                numbers, 2 capital case letters, and 2 lowercase letters.
              </p>
            )}
          </div>
        </div>

        <div>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password*"
            {...register("confirmPassword", {
              required: true,
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          <div className="error">
            {errors.confirmPassword?.type === "required" &&
              "Confirm password is required"}
            {errors.confirmPassword?.message}
          </div>
        </div>

        <div>
          <Controller
            control={control}
            name="optionsField"
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, name, ref, value } }) => (
              <Select
                id="optionsField"
                styles={colorStyles}
                components={animatedComponents}
                placeholder="-- Select Options --"
                isMulti
                className="basic-multi-select"
                classNamePrefix="select"
                isClearable={true}
                isLoading={false}
                isSearchable={true}
                closeMenuOnSelect={false}
                options={options}
                name={name}
                value={value}
                ref={ref}
                onBlur={onBlur}
                onChange={(e) => {
                  onChange(e);
                }}
              />
            )}
          />

          <div className="error">
            {errors.optionsField?.type === "required" &&
              "Please select a option"}
          </div>
        </div>

        <div>
          <div className="radio">
            <div>
              <input
                id="genderMale"
                type="radio"
                value="male"
                {...register("gender", { required: true })}
              />
              <label htmlFor="genderMale" style={{ marginLeft: "10px" }}>
                Male
              </label>
            </div>

            <div>
              <input
                id="genderFemale"
                type="radio"
                value="female"
                {...register("gender", { required: true })}
              />
              <label htmlFor="genderFemale" style={{ marginLeft: "10px" }}>
                Female
              </label>
            </div>
          </div>

          <div className="error">
            {errors.gender?.type === "required" && "Please select a gender"}
          </div>
        </div>

        <div>
          <input
            id="agree"
            type="checkbox"
            {...register("agree", { required: true })}
          />
          <label htmlFor="agree" style={{ marginLeft: "10px" }}>
            I agree with the privacy policy
          </label>
          <div className="error">
            {errors.agree?.type === "required" &&
              "Please agree with the privacy policy"}
          </div>
        </div>

        <div>
          <button>Register</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
