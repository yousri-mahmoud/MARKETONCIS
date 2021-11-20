import Glider from "react-glider";
import "glider-js/glider.min.css";


import React from 'react'

const GliderComponents = ({images, ToShow, ToScroll}) => {
    return (
        <div>
             <Glider draggable  hasArrows hasDots slidesToShow={ToShow} slidesToScroll={2}>
                 {images.map(img => {

                     return (
                          <figure className="item">
                          <img className="item__img" src={img.img} alt="item" />
                          <h5>{img.title}</h5> <p className="item__price">{img.price}</p>
                        </figure>
                     )
                 })}
      
      </Glider>
        </div>
    )
}

export default GliderComponents
