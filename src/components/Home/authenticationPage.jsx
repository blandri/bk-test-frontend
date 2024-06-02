import React, { useState } from "react";
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { authSchema } from "../../validations/authValidations";
import { login, register } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { ErrorNotificationBox } from "./errorNotification";

export const AuthPage = () => {
    const [loggingIn, setLoggingIn] = useState(false)
    const [registering, setRegistering] = useState(false)
    const [step, setStep] = useState(1)
    const [error, setError] = useState()
    const [showNot, setShowNot] = useState()
    const navigate = useNavigate()

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(authSchema),
      });
   
      const onSubmit = async (data) => {
        if(step == 1) { 
            try {
                setLoggingIn(true);
                const res = await login(data)
  
                if (!res.has_error) {
                    localStorage.setItem('logged', 'true')
                    navigate('/dashboard')
                } else {
                    setError(res.errors[0])
                    setShowNot(true)
                }
                setLoggingIn(false);
            } catch (error) {
                console.log('Error caught - login()', error);
            }
        }

        if(step === 2) {
            try {
                setRegistering(true);
                const res = await register(data)
   
                if (!res.has_error) {
                    localStorage.setItem('logged', 'true')
                    
                    navigate('/dashboard')
                } else {
                    setError(res.errors[0])
                    setShowNot(true)
                }
                setRegistering(false);
            } catch (error) {console.log(error)
                setError(error)
                setShowNot(true)
            }
        }
      };

    return (
        <div className="bg-primary h-screen overflow-hidden text-white">
      {showNot && (
        <ErrorNotificationBox setShow={setShowNot} message={error} />
      )}
      <div className="flex h-full">
        <div className="w-1/2 px-20 pt-12 relative">
          <div className={`absolute w-full ${step !== 1 && '-translate-x-20 opacity-0 invisible'} ease-in-out duration-300`}>
          <div>
            <p className="text-3xl font-semibold">Login</p>
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
                Password
              </label>
              <Controller
                name="password"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="password"
                    className={`rounded-lg bg-tertial p-2 border-2 ${
                      (errors.password && 'border-[#ef4444]') ||
                      'border-transparent focus:border-[#16a34a]'
                    }`}
                  />
                )}
              />
              {errors.password && (
                <p className="absolute -bottom-5 text-sm text-[#ef4444] font-semibold">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between">
                <button
                  type="submit"
                  disabled={loggingIn}
                  className="bg-[#16a34a] disabled:bg-[#60f195] py-2 px-4 rounded-xl mt-4 w-fit font-semibold"
                >
                  {(loggingIn && 'Logging in') || 'Login'}
                </button>
                <button type="button" onClick={() => setStep(2)} className="mt-3 text-[#16a34a] text-lg font-bold">Register</button>
                </div>
          </form>
          </div>
          <div className={`absolute w-full ${step !== 2 && 'translate-x-20 opacity-0 invisible'} ease-in-out duration-300`}>
          <div>
            <p className="text-3xl font-semibold">Register</p>
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
                Password
              </label>
              <Controller
                name="password"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="password"
                    className={`rounded-lg bg-tertial p-2 border-2 ${
                      (errors.address && 'border-[#ef4444]') ||
                      'border-transparent focus:border-[#16a34a]'
                    }`}
                  />
                )}
              />
              {errors.password && (
                <p className="absolute -bottom-5 text-sm text-[#ef4444] font-semibold">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between">
                <button
                  type="submit"
                  disabled={registering}
                  className="bg-[#16a34a] disabled:bg-[#60f195] py-2 px-4 rounded-xl mt-4 w-fit font-semibold"
                >
                  {(registering && 'Registering') || 'Sign in'}
                </button>
                <button type="button" onClick={() => setStep(1)} className="mt-3 text-[#16a34a] text-lg font-bold">Login</button>
                </div>
          </form>
          </div>
        </div>
        <div className="w-1/2 h-full border-l border-secondary relative">
          <div className="absolute top-10 left-10 h-20 w-60 bg-[#9ceb6f] z-10" />
          <div className="absolute bottom-[40%] right-36 h-20 w-60 bg-[#9ceb6f] z-10" />
          <div className="absolute top-0 left-0 h-full w-full backdrop-blur-3xl z-20" />
        </div>
      </div>
    </div>
    )
}