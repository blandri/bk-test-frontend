/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { NotificationBox } from './notification';
import { PayModal } from './orderPayModal';
import { SelectInput } from './selectInput';
import { getAllFertilizers, getAllSeeds } from '../../api/product';
import { orderSchema } from '../../validations/orderValidation';
import { createOrder } from '../../api/order';

export function HomePageComponent() {
  const [gettingProducts, setGettingProducts] = useState(false);
  const [sending, setSending] = useState(false);
  const [seeds, setSeeds] = useState([]);
  const [fertilizers, setFertilizers] = useState([]);
  const [landSize, setLandSize] = useState();
  const [fertilizerQuantity, setFertilizerQuantity] = useState();
  const [seedsQuantity, setSeedsQuantity] = useState();
  const [openPayModal, setOpenPayModal] = useState(false);
  const [payId, setPayId] = useState();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(orderSchema),
  });

  const getData = async () => {
    try {
      setGettingProducts(true);
      const fertilizerRes = await getAllFertilizers();
      const seedRes = await getAllSeeds();

      if (!fertilizerRes.has_error) {
        setFertilizers(fertilizerRes.data.data);
      }
      if (!seedRes.has_error) {
        setSeeds(seedRes.data.data);
      }
      setGettingProducts(false);
    } catch (error) {
      console.log('Error caught - getData()', error);
    }
  };

  const amountCalculator = (land, fertilizer = 3, seed = 1) => {
    const maxFertilizer = 3;
    const maxSeeds = 1;

    const maxFertilizerQuantity =
      Math.min(fertilizer, maxFertilizer) * land;
    const maxSeedsQuantity = Math.min(seed, maxSeeds) * land;

    setFertilizerQuantity(maxFertilizerQuantity);
    setValue('fertilizerAmount', `${maxFertilizerQuantity} Kg`);
    setSeedsQuantity(maxSeedsQuantity);
    setValue('seedAmount', `${maxSeedsQuantity} Kg`);
  };

  const handleLandSizeChange = (e) => {
    const { value } = e.target;
    setValue('landSize', `${value}`, { shouldValidate: true });
    setLandSize(value);
  };

  const onSubmit = async (data) => {
    try {
      setSending(true);
      const res = await createOrder(data);

      if (!res.has_error) {
        setPayId(res.data.data.id);
        setOpenPayModal(true);
      }
      setSending(false);
    } catch (error) {
      console.log('Error caught - getData()', error);
    }
  };

  useEffect(() => {
    if (landSize) amountCalculator(landSize);
  }, [landSize]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-primary h-screen overflow-hidden text-white">
      {/* <NotificationBox /> */}
      <PayModal
        open={openPayModal}
        setOpen={setOpenPayModal}
        payId={payId}
      />
      <div className="flex h-full">
        <div className="w-1/2 px-20 pt-12">
          <div>
            <p className="text-3xl font-semibold">Place your order</p>
          </div>
          <form
            onSubmit={handleSubmit((data) => onSubmit(data))}
            className="w-[70%] mt-8 grid gap-7"
          >
            <div className="grid relative">
              <label className="text-white mb-2 text-lg">Names</label>
              <Controller
                name="names"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className={`rounded-lg bg-tertial p-2 border-2 ${
                      (errors.names && 'border-[#ef4444]') ||
                      'border-transparent focus:border-[#16a34a]'
                    }`}
                  />
                )}
              />
              {errors.names && (
                <p className="absolute -bottom-5 text-sm text-[#ef4444] font-semibold">
                  {errors.names.message}
                </p>
              )}
            </div>
            <div className="grid relative">
              <label className="text-white mb-2 text-lg">
                Address
              </label>
              <Controller
                name="address"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className={`rounded-lg bg-tertial p-2 border-2 ${
                      (errors.address && 'border-[#ef4444]') ||
                      'border-transparent focus:border-[#16a34a]'
                    }`}
                  />
                )}
              />
              {errors.address && (
                <p className="absolute -bottom-5 text-sm text-[#ef4444] font-semibold">
                  {errors.address.message}
                </p>
              )}
            </div>
            <div className="relative">
              <Controller
                name="fertilizer"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <SelectInput
                    type="fertilizer"
                    rows={fertilizers.rows}
                    field={field}
                    error={errors.fertilizer}
                    setValue={setValue}
                  />
                )}
              />
              {errors.fertilizer && (
                <p className="absolute -bottom-5 text-sm text-[#ef4444] font-semibold">
                  {errors.fertilizer.message}
                </p>
              )}
            </div>
            <div className="relative">
              <Controller
                name="seed"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <SelectInput
                    type="seed"
                    rows={seeds.rows}
                    field={field}
                    error={errors.seed}
                    setValue={setValue}
                  />
                )}
              />
              {errors.seed && (
                <p className="absolute -bottom-5 text-sm text-[#ef4444] font-semibold">
                  {errors.seed.message}
                </p>
              )}
            </div>
            <div className="flex justify-between">
              <div className="grid gap-2 w-[30%] relative">
                <label className="text-white text-lg">
                  Land Size (Acre)
                </label>
                <Controller
                  name="landSize"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="number"
                      onChange={(e) => {
                        field.onChange(e); // This ensures react-hook-form handles the change
                        handleLandSizeChange(e); // This handles the custom onChange logic
                      }}
                      className={`spin-button-none truncate rounded-lg bg-tertial w-full p-2 border-2 ${
                        (errors.landSize && 'border-[#ef4444]') ||
                        'border-transparent focus:border-[#16a34a]'
                      }`}
                    />
                  )}
                />
                {errors.landSize && (
                  <p className="absolute -bottom-5 text-sm text-[#ef4444] font-semibold">
                    {errors.landSize.message}
                  </p>
                )}
              </div>
              <div className="flex justify-between w-[60%]">
                <div className="grid place-items-end gap-2">
                  <label className="text-white text-sm">
                    Fertilizer amount (Kg)
                  </label>
                  <input
                    type="number"
                    disabled
                    value={fertilizerQuantity}
                    className="spin-button-none truncate rounded-lg bg-tertial w-[60%] p-2 border-2 border-transparent focus:border-[#16a34a]"
                  />
                </div>
                <div className="grid place-items-end gap-2">
                  <label className="text-white text-sm">
                    Seed amount (Kg)
                  </label>
                  <input
                    type="number"
                    disabled
                    value={seedsQuantity}
                    className="spin-button-none truncate rounded-lg bg-tertial w-[60%] p-2 border-2 border-transparent focus:border-[#16a34a]"
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={sending}
              className="bg-[#16a34a] disabled:bg-[#60f195] py-2 px-4 rounded-xl mt-4 w-fit font-semibold"
            >
              {(sending && 'Sending') || 'Place order'}
            </button>
          </form>
        </div>
        <div className="w-1/2 h-full border-l border-secondary relative">
          <div className="absolute top-10 left-10 h-20 w-60 bg-[#9ceb6f] z-10" />
          <div className="absolute bottom-[40%] right-36 h-20 w-60 bg-[#9ceb6f] z-10" />
          <div className="absolute top-0 left-0 h-full w-full backdrop-blur-3xl z-20" />
        </div>
      </div>
    </div>
  );
}
