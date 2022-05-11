import React, { useEffect, useState } from 'react';
import '../../styles/Autorization/Autorization.scss';
import '../../styles/Forms/Forms.scss';
import AuthFormControl from './AutorizationTypes/AuthFormControl';
import { useNavigate } from 'react-router-dom';
import { setIsAuthAC, setIsLoadingAC, setIsNeedRedirectAC, setUserDataAC } from '../../redux/auth-reducer';
import { connect } from 'react-redux';

const AuthPageBody = (props) =>{

    let navigate = useNavigate();
    useEffect(() => {
    if (props.auth.isAuth){
        return navigate("/table");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.auth.isAuth]);

    const [typeOfPage, setTypeOfPage] = useState("login")

    function authUser (userdata, errorMessageSetter, errorFieldName, needRemember=false) {
        const loginUrl = "http://127.0.0.1:8000/auth/login"
            
            const goodResponseHandler = (response)=>{
                if (response.status === 200){
                    props.setIsAuth(true)
                    props.setIsNeedRedirect(true)
                    props.setUserData({
                        userId: null,
                        token: response.data.token,
                        username: ""
                    })
                    //
                }           
            }
            const badResponseHandler = (err) => {
                if (err.response.status === 400){
                    errorMessageSetter(errorFieldName, "Неверный логин или пароль")
                }
                
            }
            // postApiRequest(loginUrl, userdata, goodResponseHandler, badResponseHandler)
            
    }

    const onButtonSwitchFrom = (formType) =>{
        setTypeOfPage(formType)
    }

    const onSubmitLoginForm = (formData, errorMessageSetter, errorFieldName) =>{
        console.log("Form data", formData)
        const userData = JSON.stringify(formData)
        authUser(userData, errorMessageSetter, errorFieldName, formData.rememberMe)
        props.setIsAuth(true)

    }
    const onSubmitRegisterForm = (formData, errorMessageSetter, errorFieldName) =>{
        console.log("Form data", formData)
        const loginUrl = "http://127.0.0.1:8000/api/auth/register_user/"
        const userData = JSON.stringify(formData)
        const goodResponseHandler = (response)=>{
            if (response.status === 200){
                let userdata = {}
                console.log("new username", response.data.username)
                userdata.username = response.data.username
                userdata.password = formData.password
                authUser(userdata, errorMessageSetter, errorFieldName)
            }           
        }
        const badResponseHandler = (err) => {
            if (err.response.status === 400){
                errorMessageSetter(errorFieldName, err.detail)
            }
            
        }
        
        // postApiRequest(loginUrl, userData, goodResponseHandler, badResponseHandler)
        props.setIsAuth(true)
    }
    return (
        <main className="page">
            <section className="section page__base autorization-page">
                <div className="autorization-page__container _container">
                    <AuthFormControl 
                        control={typeOfPage}
                        submitLoginFormHandler={onSubmitLoginForm}
                        submitRegisterForm={onSubmitRegisterForm}
                        switchFormHandler={onButtonSwitchFrom}
                        errorHandler={()=>(null)}
                    />
                </div>
            </section>
        </main>
    )
}

let mapStateToProps = (state)=>{
    return {
        auth: state.auth,
    }
}
let mapDispatchToProps = (dispatch)=>{
    return{
        setIsAuth: (isAuth) => {
            dispatch(setIsAuthAC(isAuth));
        },
        setIsLoading: (isLoading) =>{
            dispatch(setIsLoadingAC(isLoading));
        },
        setIsNeedRedirect: (isNeedRedirect) =>{
            dispatch(setIsNeedRedirectAC(isNeedRedirect))
        },
        setUserData: (userData) => {
            dispatch(setUserDataAC(userData))
        }
    }
}
const AuthPageContainer = connect(mapStateToProps, mapDispatchToProps)(AuthPageBody);

export default AuthPageContainer
