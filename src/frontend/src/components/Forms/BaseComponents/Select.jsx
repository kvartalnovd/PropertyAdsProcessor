import React from 'react';
import { ErrorMessage, Field } from 'formik';
import TextError from './TextError';

function Select(props) {
    const {label, name, options, ...rest} = props

    return (
        <div className="form-control select__block">
            <label className={"select__label "+ props.labelClassName } htmlFor={name}>{label}</label>
            <Field 
            className={"select__field " + props.fieldClassName } 
            as="select"  id={name} name={name} {...rest} >
                {options.map(option => {
                    return(
                        <option key={option.key} value={option.value}>
                            {option.key}
                        </option>
                    )
                })}
            </Field>

            <ErrorMessage name={name} component={TextError}/>
        </div>
    );
}

export default Select;