import {createContext} from 'react'

export const LoaderContext = createContext({
    value: 0,
    max: 0,
    setValue: () => {},
    setMax: () => {}
})
