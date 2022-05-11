import { Field } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import TextError from './TextError';

function CheckBoxGroup(props) {
    const {label, name, options, checkboxValue, isError, wrapperClassName} = props

    const inputRef = useRef(null)
    const [checked, setChecked] = useState(checkboxValue)
    const CheckBoxClickHandler = (e) =>{
        props.standartOnChange(e)
        let target = e.currentTarget.htmlFor
        let needRemove = checked.indexOf(target) !== -1
        let checkedCopy = []
        checked.forEach(el => {
            if (el !== target){
                checkedCopy.push(el)
            }
        });
        if (!needRemove){
            checkedCopy.push(target)  
        }
        setChecked(checkedCopy)
        
    }
    const [labelClass, setLabelClass] = useState("checkbox__label")

    useEffect(() => {
        if (isError){
            setLabelClass("checkbox__label _error")
        }
        else{
            setLabelClass("checkbox__label")
        }
    }, [isError])

    let itemClassName = ""
    if (props.itemClassName != null) {
        itemClassName = props.itemClassName
    }

    return (
        <div  className={wrapperClassName}>
        
            {label != null ? <label htmlFor={name}>{label}</label>: null}
            <Field name={name}>
                {
                    ({field}) => {
                        return options.map((option, i) =>{
                            return (
                                <div className={itemClassName} key={i}>
                                    <input 
                                        className="checkbox__input"
                                        type="checkbox"
                                        id={option.value}
                                        {...field}
                                        value={option.value}
                                        checked={checkboxValue.indexOf(option.value) !== -1}
                                        ref={inputRef}
                                    />

                                    <label
                                        id={option.value + " label"}
                                        className={props.labelClassName != null ? labelClass + props.labelClassName : labelClass}
                                        htmlFor={option.value}
                                        onClick={CheckBoxClickHandler}
                                    >
                                        <div className={'checkbox-block__label-with-link'}>
                                            <span id={option.value + " text"}>{option.key}</span>
                                            {option.link != null ? 
                                            <Link
                                                to={option.link.ref}
                                                className="_text-link"
                                            >
                                                <span>{option.link.text}</span>
                                            </Link> : null   
                                            }
                                        </div>
                                    </label>
                                </div>
                            )
                        })
                    }
                }
            </Field>
            {isError ? <TextError>{isError}</TextError> : null}
            </div>
    );
}

export default CheckBoxGroup;