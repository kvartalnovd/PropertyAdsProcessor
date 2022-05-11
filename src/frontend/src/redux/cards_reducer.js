const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_PAGE_SIZE = "SET_PAGE_SIZE";
const SET_CARDS = "SET_CARDS";
const REMOVE_CARD = "REMOVE_CARD";
const ADD_CARDS = "ADD_CARDS";
const SET_STATUS = "SET_STATUS"

let initialState = {
    current_page : 1,
    page_size: 5,
    cards: []
    
}

const cardsReducer = (state = initialState, action) =>{
    switch (action.type){
        case SET_CURRENT_PAGE: {
            
            let stateCopy= {...state, current_page: action.page}
            return stateCopy
        }
        case SET_PAGE_SIZE: {
            
            let stateCopy = {...state, page_size: action.page_size}
            return stateCopy
        }
        case SET_CARDS:{
            
            let stateCopy = {...state}
            stateCopy.cards = action.cards.map( card => (card))
            return stateCopy
        }
        case ADD_CARDS:{
            
            let stateCopy = {...state}
            stateCopy.cards = [...stateCopy.cards, ...action.cards]
            return stateCopy
        }
        case REMOVE_CARD: {
            
            let stateCopy = {...state }
            stateCopy.cards = stateCopy.cards.map( card => {
                if (card.id !== action.id){
                    return card
                }
            })
            return stateCopy
        }
        case SET_STATUS: {
            
            let stateCopy = {...state }
            stateCopy.cards = stateCopy.cards.map( card => {
                if (card.id === action.id){
                    card.status = action.status
                }
                return card
            })
            return stateCopy
        }
        default: 
            return state
    }
}

export const setCurrentpageAC = (page) => ({type: SET_CURRENT_PAGE, page});
export const setPageSizeAC = (page_size) => ({type: SET_PAGE_SIZE, page_size});
export const setCardsAC = (cards) => ({type: SET_CARDS, cards});
export const addCardsAC = (cards) => ({type: ADD_CARDS, cards});
export const setRemoveCardAC = (id) => ({type: REMOVE_CARD, id});
export const setStatusAC = (id, status) => ({type: SET_STATUS, id, status})
export default cardsReducer