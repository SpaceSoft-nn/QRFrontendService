import * as yup from 'yup';

export const registrationSchema = yup.object({
    email: yup.string()
        .email('Введите корректный адрес электронной почты')
        .notRequired(),
    tel: yup.string()
        .notRequired(),
    password: yup
        .string()
        .required('Введите пароль')
        .min(8, 'Пароль должен содержать минимум 8 символов'),
    passwordConfirm: yup
        .string()
        .oneOf([yup.ref('password')], 'Пароли должны совпадать')
        .required('Подтвердите ваш пароль'),
    terms: yup
        .boolean()
        .required('Необходимо принять условия использования')
        .oneOf([true], 'Необходимо принять условия использования'),
}).test('emailOrTel', 'Введите адрес электронной почты или номер телефона', function(value) {
    return !!(value.email || value.tel);
})
.required();

export const loginSchema = yup.object({
    email: yup.string()
        .email('Введите корректный адрес электронной почты')
        .notRequired(),
    tel: yup.string()
        .notRequired(),
    password: yup
        .string()
        .required('Введите пароль')
        .min(6, 'Пароль должен содержать минимум 8 символов'),
})
.test('emailOrTel', 'Введите адрес электронной почты или номер телефона', function (value) {
    return !!(value.email || value.tel);
}).required();

export const verifyCodeSchema = yup.object({
    code: yup
        .string()
        .required('Введите код подтверждения')
}).required();