import React, {useEffect} from 'react'
import "materialize-css/dist/css/materialize.min.css";


export const ProgressLoader = (v, m) => {

    const element = document.querySelector('.determinate')
    if(element && v.v === 1){
        element.setAttribute(
            'style',
            `display:block`)
    }

    const onEndAnimationHandler = (element) => {
        if(element){

            setTimeout(()=>{
                element.target.setAttribute(
                    'style',
                    `width:0%; display:none`)
            },100)
        }
    }

    return(
        <div className="row-custom">
            <div className="progress">
                <div className="determinate"
                     onTransitionEnd={onEndAnimationHandler}
                     style={{width: v.v+'%'}}
                     />
            </div>
        </div>
    )
}