import React from 'react';
import {Formik, Form} from 'formik';
import * as Yup from 'yup'
import FormikControl from '../BaseComponents/FormikControl';
import ButtonsBlock from '../../lib/SupportsComponents/ButtonsBlock';
function LoginForm(props){

    const initialValues = {
        username: '',
        password: '',
    }

    const validation = Yup.object({
        username: Yup.string().required('Поле "Логин" обязательно для заполнения.'),
        password: Yup.string().required('Поле "Пароль" обязательно для заполнения.')
    })

    const onSubmit = (values, helpers) =>{
        props.handlerSubmit(values, helpers.setFieldError, 'password')
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validation} onSubmit={onSubmit}>
            {
                ({ errors, touched, isValid, handleBlur}) => {
                    
                    return (
                        <Form className="authForm loginForm" autoComplete="off" >
                            <div className="authForm__form">
                                <FormikControl 
                                    control='input' 
                                    type="text" 
                                    label='Логин' 
                                    name='username'
                                    fieldClassName="auth_input"
                                    placeholder="Логин"
                                    standartOnBlur={handleBlur}
                                    isError={errors.username && touched.username}
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
                                
                            </div>
                            <ButtonsBlock 
                                isFormValid={isValid} 
                                wrapperClass={"authForm__button-block"} 
                                formType={"login"}
                                buttonSwitchHandler={props.buttonSwitchHandler}
                            />
                        </Form>
                    )
                }
            }
        </Formik>
    )

}

export default LoginForm