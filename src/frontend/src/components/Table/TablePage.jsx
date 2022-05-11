import React, { useEffect, useState } from 'react';
import SimpleCard from './SimpleCard';
import './SimpleCard.scss';
import { useNavigate } from 'react-router-dom';
import { setIsAuthAC } from '../../redux/auth-reducer';
import { connect } from 'react-redux';
import { addCardsAC, setCardsAC, setCurrentpageAC, setPageSizeAC, setRemoveCardAC, setStatusAC } from '../../redux/cards_reducer';
import { getData } from '../../redux/fake_data';

function TablePage(props) {

    // status 1 - можно взять в работу
    // status 2 - взято в работу другим менеджером
    // status 3 - взято в работу текущим менеджером

    let navigate = useNavigate();

    useEffect(() => {
    if (!props.auth.isAuth){
        return navigate("/auth");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.auth.isAuth]);

    const [fetching, setFetching] = useState(true)

    useEffect(() => {
        if (fetching){
            console.log('set request ', props.table.page_size, " ", props.table.current_page)
            const loginUrl = `http://127.0.0.1:8000/api/v1/get_cards?page_size=${props.table.page_size}&current_page=${props.table.current_page}`
            
            const goodResponseHandler = (response)=>{
                if (response.status === 200){
                    if (response.data.length > 1){
                        if (props.table.current_page !== 1){
                            props.addCards(response.data)
                        }
                        else{
                            props.setCards(response.data)
                        }
                        props.setCurrentpage(props.table.current_page + 1)
                    }
                }
                setFetching(false)           
            }
            const badResponseHandler = (err) => {
                if (err.response.status === 400){
                    console.log("что-то пошло не так")
                }
                setFetching(false)
            }
            // getApiRequest(loginUrl, userdata, goodResponseHandler, badResponseHandler)
            
            const cards = getData(props.table.page_size, props.table.current_page)
            console.log("cards ", cards)
            if (cards.length > 1){
                if (props.table.current_page !== 1){
                    props.addCards(cards)
                }
                else{
                    props.setCards(cards)
                }
                props.setCurrentpage(props.table.current_page + 1)
            }
            
            setFetching(false)
            
        }
    }, [fetching])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)

        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [])

    const scrollHandler = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100){
            setFetching(true)
        }
    }

    const cardClickHandler = (status, id) => {
        if (status === 1){
            props.setStatus(id, 2)
        }
        else{
            props.setStatus(id, 1)
        }
    }

    let cards = null
    if (props.table.cards.length > 0){
        cards = props.table.cards.map( el => {
            return <SimpleCard key={el.id} data={el} clickHandler={cardClickHandler}/>
        })
    }
    

    return (
        <div className='page _purple'>
            <section className="section">

                <div className='__container'>
                    {cards}
                </div>

            </section>
        </div>
    );
    }

    let mapStateToProps = (state)=>{
        return {
            auth: state.auth,
            table: state.table
        }
    }
    let mapDispatchToProps = (dispatch)=>{
        return{
            setIsAuth: (isAuth) => {
                dispatch(setIsAuthAC(isAuth));
            },
            setCurrentpage: (page) => {
                dispatch(setCurrentpageAC(page));
            },
            setPageSize: (page_size) => {
                dispatch(setPageSizeAC(page_size));
            },
            setCards: (cards) => {
                dispatch(setCardsAC(cards));
            },
            addCards: (cards) => {
                dispatch(addCardsAC(cards));
            },
            setRemoveCard: (id) => {
                dispatch(setRemoveCardAC(id));
            },
            setStatus: (id, status) => {
                dispatch(setStatusAC(id, status));
            },
        }
    }
    const TablePageContainer = connect(mapStateToProps, mapDispatchToProps)(TablePage);
    
    export default TablePageContainer
    