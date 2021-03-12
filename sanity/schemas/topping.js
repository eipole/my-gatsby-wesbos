import {FaPepperHot as icon} from 'react-icons/fa'
export default {
    name: 'topping',
    title: 'Topping',
    type: 'document',
    icon,
    fields:[
        {
            name: 'name',
            title: 'Topping name',
            type: 'string',
            description: 'Name of topping'
        },
        {
            name: 'vegetarian',
            title: 'Vegetarian',
            type: 'boolean',
            description: 'Name of topping',
            options:{
                layout: 'checkbox'
            }
        }
    ],
    // optional
    preview:{
        select:{
            name: 'name',
            vegetarian: 'vegetarian'
        },
        prepare: fields => ({
            title: `This is the ${fields.name} ${fields.vegetarian ? '+seedling' : '' } `
        })
    }
}