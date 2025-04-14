import React from 'react';

const RecommendationCard = ({item}) => {
    return (
        <div className="ContainerCard">

        <div className='RecommendationCard' style={{marginBottom:-1.5 }}>
            <img src={item.image} alt={item.title}/>
            <p style={{fontSize:'13px',fontWeight:'bold',top:'-10px'}}>{item.description}</p>
            <div className='Prices'>
                <p style={{position:'relative',top:'-12px'}}>Now ${item.price}</p>
                <p style={{color:'grey',textDecoration:'line-through',position:'relative',top:'-12px'}}> ${item.oldprice}</p>
                <button style={{width:'70px',height:'30px',position:'relative',borderRadius:'20px',border:'none'}}> Add </button>
            </div>
            <div className="Sold">
                <div>
                    {item.Sold}K  +sold
                </div>
                <div>
                    {item.Comment}
                </div>

            </div>
            <div style={{ display:'flex'}} className="Statistiques">
                <div> {item.Stars}</div>
                <div style={{position:'relative',top:'2px'}}>{item.Statistiques}</div>

            </div>

        </div>

        </div>
    )
}
export default RecommendationCard;
