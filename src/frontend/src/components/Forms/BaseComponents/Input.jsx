import React, {useEffect, useState } from 'react';
import { Field, ErrorMessage  } from 'formik';
import TextError from './TextError';

const Input = (props) =>{
    const {label, name, type, placeholder, standartOnBlur, isError} = props

    let wrapperClassName = "form-control input__block"
    if (props.wrapperClassName != null){
        wrapperClassName = props.wrapperClassName
    }
    
    const [inputType, setInputType] = useState(type)
    const onPasswordFieldIconClick = (e) => {
        if (inputType === 'password'){
            setInputType('text')
            setInputIconClass("input__rigth-icon _active _icon-eye-blocked")
        }
        else{
            setInputType('password')
            setInputIconClass("input__rigth-icon _icon-eye")
        }
    }

    const [inputIconClass, setInputIconClass] = useState("input__rigth-icon _icon-eye")
    const [labelClass, setLabelClass] = useState("input__label ")
    const [inputClass, setInputClass] = useState("input__field ")
    const [inputPlaceholder, setInputPlaceholder] = useState(placeholder)

    
    useEffect(() => {
        if (props.alwaysShowLabel){
            setLabelClass("input__label _active ")
        }
    }, [props.alwaysShowLabel])

    useEffect(() => {
        if (isError){
            setInputClass("input__field _error ")
        }
        else{
            setInputClass("input__field ")
        }
    }, [isError])

    const focusHandler = (e) =>{
        setInputPlaceholder("");
        if(!props.alwaysShowLabel){
            setLabelClass("input__label _active ")
        }
        
    }
    const blurHandler = (e) =>{
        standartOnBlur(e)
        setInputPlaceholder(placeholder)
        if(!props.alwaysShowLabel){
            setLabelClass("input__label ")
        }
    }
    return (
        <div className={wrapperClassName}>
            <label 
                className={props.labelClassName != null ? labelClass + props.labelClassName : labelClass} 
                htmlFor={name}
            >
                {label}
            </label>
            <Field 
                className={props.fieldClassName !== null ? inputClass + props.fieldClassName : inputClass}
                id={name} 
                name={name} 
                type={inputType}
                placeholder={inputPlaceholder}
                onFocus={focusHandler}
                onBlur={blurHandler}
            />
            {
                type === 'password' ? 
                    <span 
                        className={inputIconClass} 
                        onClick={onPasswordFieldIconClick}
                    ></span> : null
            }
            
            <ErrorMessage name={name} component={TextError}/>
        </div>
    )
}
export default Input