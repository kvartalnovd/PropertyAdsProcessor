import Login from "./Login"
import Registration from "./Registration"



const AuthFormControl = (props) =>{
    const {control, errorHandler, ...rest} = props
    switch(control){
        case 'login' :
            return <Login {...rest}/>
        case 'registration':
            return <Registration {...rest}/>
        default: 
            return errorHandler
    } 
    
}
export default AuthFormControl