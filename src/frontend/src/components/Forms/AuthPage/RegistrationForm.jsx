import React from 'react';
import {Formik, Form} from 'formik';
import * as Yup from 'yup'
import FormikControl from '../BaseComponents/FormikControl';
import ButtonsBlock from '../../lib/SupportsComponents/ButtonsBlock';
function RegistrationForm(props){

    const initialValues = {
        email: '',
        password: '',
        confirm_password: '' ,
    }

    const validation = Yup.object({
        email: Yup.string()
            .email('Неверный формат почтового адреса')
            .required('Поле "Email" обязательно для заполнения.'),
        password: Yup.string()
            .required('Поле "Пароль" обязательно для заполнения.')
            .min(6, "Пароль должен содержать 6 или более символов")
            .max(25, "Пароль не может содержать более 24 символов"),
        confirm_password: Yup.string().oneOf([Yup.ref('password'), ''], 'Пароли не совпадают.').required('Подтвердите пароль.'),
    })

    const onSubmit = (values, helpers) =>{
        console.log("Form data", values)
        props.handlerSubmit(values, helpers.setFieldError, 'email')
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validation} onSubmit={onSubmit}>
            {
                ({ errors, touched, isValid, handleBlur}) => {
                    return (
                        <Form className="authForm registerForm" autoComplete="off">
                            <div className="authForm__form">

                                <FormikControl 
                                    control='input' 
                                    type="email" 
                                    label='Email' 
                                    name='email' 
                                    fieldClassName="auth_input" 
                                    placeholder="Email"
                                    standartOnBlur={handleBlur}
                                    isError={errors.email && touched.email}
                                />
                                <FormikControl 
                                    control='input' 
                                    type="password" 
                                    label='Пароль' 
                                    name='password' 
                                    fieldClassName="auth_input"
                                    placeholder="Пароль"
                                    standartOnBlur={handleBlur}
                                    isError={errors.password && touched.password}
                                />
                                <FormikControl 
                                    control='input' 
                                    type="password" 
                                    label='Подтверждение пароля' 
                                    name='confirm_password' 
                                    fieldClassName="auth_input" 
                                    placeholder="Подтверждение пароля"
                                    standartOnBlur={handleBlur}
                                    isError={errors.confirm_password && touched.confirm_password}
                                />

                            </div>
                            <ButtonsBlock 
                                isFormValid={isValid} 
                                wrapperClass={"authForm__button-block"} 
                                formType={"registration"}
                                buttonSwitchHandler={props.buttonSwitchHandler}
                            />
                        </Form>
                    )
                }
            }
        </Formik>
    )

}

export default RegistrationForm