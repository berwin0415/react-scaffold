import React, { FC, useEffect,ReactNode } from 'react'
import rhine from 'rhine'
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
    let timer = null
    useEffect(() => {
        // timer = setInterval(() => {
        //     axios.get('http://localhost:4000').then(res => console.log(res))
        // rhine.get('')
        // },100)
    }, [1])
    return (
        <div onClick={() => history.push('/demo')}>home</div>
    );
}
export default Home
