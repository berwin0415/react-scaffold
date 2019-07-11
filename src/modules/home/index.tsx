import React from 'react'

interface DemoProps {
    history: any
    match: any
    location: any
}
const index = ({ history }: DemoProps) => {

    return <div onClick={() => history.push('/demo')}>home</div>
}

export default index