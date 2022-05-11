function SimpleCard(props) {

    const clickHandler = () => {
        props.clickHandler(props.data.status, props.data.id)
    }
    let cardClass = "section__card card"
    if (props.data.status === 2){
        cardClass += " _in-work"
    }

    return (
        <div className={cardClass}>
            <div className='card__image'>
                <img src={props.data.img_url} className='img-responsive' alt=''/>
            </div>
            <div className='card__data'>
                <div className='data-items-comtainer'>
                    <div className='card__item'>
                        <span className='title'>Номер:</span>
                        <span className="item">{props.data.number}</span>
                    </div>
                    <div className='card__item'>
                    <span className='title'>Ссылка на ресурс:</span>
                        <span className="item_link"><a href={props.data.reference} target="_blank" rel="noreferrer">Перейти</a></span>
                    </div>
                    <div className='card__item'>
                    <span className='title'>Время:</span>
                        <span className="item">{props.data.date}</span>
                    </div>
                </div>
                <div className='button_container'>

                
                <button className='delete_button' onClick={clickHandler}>
                    {props.data.status === 1 ? "Взять в работу" : "отмена"}
                </button>
                </div>
            </div>
            
        </div>
    );
    }

export default SimpleCard;