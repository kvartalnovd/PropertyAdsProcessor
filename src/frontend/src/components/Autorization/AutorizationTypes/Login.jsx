import React from 'react';
import LoginForm from '../../Forms/AuthPage/LoginForm';
import TopBlockTitle from '../../lib/SupportsComponents/TopBlockTitle';

const Login =(props) =>{

    const TitleWrapperClass = "autorization-page__top-block"
    const page_title = "Вход в личный кабинет"

    return (
        <div className="autorization-page__content">
             <TopBlockTitle title={page_title} wrapperClass={TitleWrapperClass}/>
            <LoginForm handlerSubmit={props.submitLoginFormHandler} errorMessage={props.errorMessage} buttonSwitchHandler={props.switchFormHandler}/>
        </div>
    );
}


export default Login;