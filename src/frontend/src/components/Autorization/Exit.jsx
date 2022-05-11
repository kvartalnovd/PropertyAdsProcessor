import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setIsAuthAC } from '../../redux/auth-reducer';
import { connect } from 'react-redux';

function Exit(props) {

    
    let navigate = useNavigate();
    useEffect(() => {
    if (props.auth.isAuth){
        props.setIsAuth(false)
        return navigate("/table");
    }
    else{
        return navigate("/auth")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.setIsAuth]);

    return (
        <div>
            
        </div>
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
    }
}
const ExitContainer = connect(mapStateToProps, mapDispatchToProps)(Exit);

export default ExitContainer