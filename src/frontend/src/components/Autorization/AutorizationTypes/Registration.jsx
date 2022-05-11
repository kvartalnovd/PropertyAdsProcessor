import React from 'react';
import RegistrationForm from '../../Forms/AuthPage/RegistrationForm';
import TopBlockTitle from '../../lib/SupportsComponents/TopBlockTitle';

const Registration =(props) =>{

    const TitleWrapperClass = "autorization-page__top-block"
    const page_title = "Зарегистрироваться"
    const link_under_page_title = {
        ref: "/order-results",
        text: "Посмотреть результаты по номеру заказа",
    }

    return (
        <div className="autorization-page__content">
            <TopBlockTitle title={page_title} wrapperClass={TitleWrapperClass}/>
            <RegistrationForm handlerSubmit={props.submitRegisterForm} errorMessage={props.errorMessage} buttonSwitchHandler={props.switchFormHandler}/>
        </div>
    );
}


export default Registration;