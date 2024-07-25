import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button, FormHeader, VerificationCodeInput } from "../../components"

interface IRegisterVerifyFormInput {
  code: string;
}

export const RegisterVerify: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterVerifyFormInput>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IRegisterVerifyFormInput> = data => {
    navigate("/dashboard");
    console.log(data);
  }

  return (
    <div className='centered'>
      <form method="post" className='widget w-[400px]' onSubmit={handleSubmit(onSubmit)}>
        <FormHeader title='Введите код' showBackBtn={false} />
        <div className="verify-input">
          {<p className='error-message'>{errors.code?.message}</p>}
          <VerificationCodeInput
            {...register('code')}
            className='form-input text-white text-center mb-[20px]'
          />
        </div>
        <Button type="submit" className="btn-primary">Отправить</Button>
      </form>
    </div>
  )
}