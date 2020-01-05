import React,{createContext, useState, useEffect} from 'react'
import {IUser,IAuthContext} from './types'
import {RouteComponentProps, withRouter} from 'react-router'
import { useTranslation } from 'react-i18next'
import {getObject,setObject} from '../../utils/localStorage'

//TODO: definr home
const homeRoute = '/'
const loginRoute = '/'

const localStorageUserKey = '_user'

export const AuthContext = createContext<IAuthContext>({
    authenticate: (email:string,password:string) => new Promise((resolve,reject)=>{}),
    logout: () => {},
    verifyPermissions:(permissions: string[]) => true,
    verifySession: () => true
})

const AuthContextProvider: React.FC<RouteComponentProps> = ({children,location, history}) => {

    const { t } = useTranslation()

    const [user,setUser] = useState<IUser>()

    //Check if there's a user saved on localStorage on component mount
    React.useEffect(()=>{
        const userFromLocalStorage = getObject(localStorageUserKey)

        //user exists and is not expired
        if(userFromLocalStorage && userFromLocalStorage.sessionExp < new Date())
            setUser(userFromLocalStorage)
        
        //if user is expired, logoutUser
        else if(userFromLocalStorage) logout()
    },[])


    const authenticate = async (email:string,password:string) => {
        const from = location.state ? location.state.from : homeRoute
        //Dummy authentication
        if(email === 'admin@email.com' && password === 'password'){

            const exp = Date.now() + (2 * 60 * 60 * 1000)

            setUser({
                name: 'Dummy user',
                email: 'admin@email.com',
                permissions:['dashboard'],
                token: '',
                sessionExp: new Date(exp)
            })

            history.push(from)
        }
        else{
            throw new Error(t('error.invalidCredentials'))
        }
    }

    const logout = () => {
            localStorage.removeItem(localStorageUserKey)

            const currrentPath = location.pathname
            //prevent a redirection loop
            if(currrentPath !== loginRoute){
                //redirect with currrent page on state
                history.push(loginRoute,{
                    from: currrentPath
                })
            }
            
    }

    //Verify both permissions and sessions
    const verifyPermissions = (permissions: string[]) => (
        user && verifySession() && !permissions.some(permission=>!user.permissions.includes(permission)) ? true : false
    )

    const verifySession = () => {
        const verified = user && user.sessionExp && user.sessionExp < new Date() ? true : false
        //If user is not logged in or session is expired, then logout user
        if(!verified) logout()
        return verified
    }

    return(<AuthContext.Provider value={{
        user,
        authenticate,
        logout,
        verifyPermissions,
        verifySession
    }}>
        {children}
    </AuthContext.Provider>)
}

export default withRouter(AuthContextProvider)