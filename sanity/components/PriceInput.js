import React from 'react'
import PatchEvent, {set, unset} from 'part:@sanity/form-builder/patch-event'

function createPatchFrom(event){
    const price = event.target.value
   return (PatchEvent.from(price ===  '' ? unset() : set(Number(price))))
}

const formatMoney = Intl.NumberFormat('en-CA',{
    style: 'currency',
    currency: 'CAD',
}).format

function PriceInput({type, value, onChange, inputComponent}){
    return(
        <div>
            <h2>{type.title} - {value && formatMoney(value/100) } </h2>
            <p>{type.description}</p>
            <input 
            type={type.name} 
            value={value}
            ref={inputComponent}
            onChange={event=>onChange(createPatchFrom(event))} />
        </div>
    )
}

export default PriceInput