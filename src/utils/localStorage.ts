import { stringify } from "querystring"



export const getObject = (key: string) : any => {
    try{
        const objectString = localStorage.getItem(key)
        return objectString ? JSON.parse(objectString) : null
    }
    catch(error){
        return null
    }
}

export const setObject = (key:string, object:any) => {
    const stringifiedObject = JSON.stringify(object)
    localStorage.setItem(key,stringifiedObject)
}