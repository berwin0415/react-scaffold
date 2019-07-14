import React, { FC, useEffect,ReactNode } from 'react'
import rhine from './lib'

interface DemoProps {
    children?:ReactNode
    history?: any
    match?: any
    location?: any
}
const Home: FC = ({history}:DemoProps) => {
    useEffect(() => {
        rhine({
            method:"get",
            url:"/api/v0/demo"
        })
    }, [1])
    return (
        <div onClick={() => history.push('/demo')}>home</div>
    );
}
export default Home
