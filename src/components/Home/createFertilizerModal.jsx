import React, { useState } from "react";
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createFertilizer } from "../../api/product";
import { SuccessNotificationBox } from "./successNotification";
import { fertilizerSchema } from "../../validations/fertilizerValidation";

export const CreateFertilizerModal = ({ open, setOpen, setMessage, setOpenSuccess}) => {
  const [adding, setAdding] = useState(false)

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(fertilizerSchema),
  });

  const onSubmit = async (data) => {
    try {
      setAdding(true);
      const res = await createFertilizer(data.name)

      if (!res.has_error) {
        setOpen(false)
        setMessage('Added succesfully')
        setOpenSuccess(true)
      } else {
        setOpen(false)
        // setMessage(res.errors[0])
      }

      setAdding(false);
    } catch (error) {
      console.log('Error caught - addFertilizer()', error);
    }
  }

    return (
        <div>
        <div className="absolute z-40 top-0 left-0 h-screen w-screen bg-[rgba(0,0,0,.7)] flex justify-center pt-10">
          <div className="border border-[#16a34a] bg-primary rounded-lg h-fit w-1/3 p-5 relative">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-3 w-5 h-5 rounded-full bg-[#fecaca] grid place-items-center cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-[12px] h-[12px] text-[#ef4444]"
                viewBox="0 0 256 256"
                fill="none"
              >
                <path
                  d="M205.66 194.34C206.403 195.083 206.993 195.966 207.395 196.937C207.797 197.908 208.004 198.949 208.004 200C208.004 201.051 207.797 202.092 207.395 203.063C206.993 204.034 206.403 204.917 205.66 205.66C204.917 206.403 204.034 206.993 203.063 207.395C202.092 207.797 201.051 208.004 200 208.004C198.949 208.004 197.908 207.797 196.937 207.395C195.966 206.993 195.083 206.403 194.34 205.66L128 139.31L61.66 205.66C60.1589 207.161 58.1229 208.004 56 208.004C53.8771 208.004 51.8411 207.161 50.34 205.66C48.8389 204.159 47.9956 202.123 47.9956 200C47.9956 197.877 48.8389 195.841 50.34 194.34L116.69 128L50.34 61.66C48.8389 60.1589 47.9956 58.1229 47.9956 56C47.9956 53.8771 48.8389 51.8411 50.34 50.34C51.8411 48.8389 53.8771 47.9956 56 47.9956C58.1229 47.9956 60.1589 48.8389 61.66 50.34L128 116.69L194.34 50.34C195.841 48.8389 197.877 47.9956 200 47.9956C202.123 47.9956 204.159 48.8389 205.66 50.34C207.161 51.8411 208.004 53.8771 208.004 56C208.004 58.1229 207.161 60.1589 205.66 61.66L139.31 128L205.66 194.34Z"
                  fill="currentColor"
                />
              </svg>
            </button>
            <form action="" onSubmit={handleSubmit((data) => onSubmit(data))}>
            <div className="grid relative">
              <label className="text-white mb-2 text-lg">Fertilizer Name</label>
              <Controller
                name="name"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className={`rounded-lg bg-tertial p-2 border-2 ${
                      (errors.name && 'border-[#ef4444]') ||
                      'border-transparent focus:border-[#16a34a]'
                    }`}
                  />
                )}
              />
              {errors.name && (
                <p className="absolute -bottom-5 text-sm text-[#ef4444] font-semibold">
                  {errors.name.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={adding}
              className="bg-[#16a34a] disabled:bg-[#60f195] py-2 px-4 rounded-xl mt-8 w-fit font-semibold"
            >
              {(adding && 'Adding') || 'Add fertilizer'}
            </button>
            </form>
          </div>
        </div>
    </div>
    )
}