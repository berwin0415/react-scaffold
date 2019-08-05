import React, { FC, useEffect,ReactNode } from 'react'

interface DemoProps {
    children?:ReactNode
    history?: any
    match?: any
    location?: any
}

interface Res {
    title:string
}
const Home: FC = ({history}:DemoProps) => {
    useEffect(() => {

       
    }, [1])
    return (
        <div onClick={() => history.push('/demo')}>home</div>
    );
}
export default Home
