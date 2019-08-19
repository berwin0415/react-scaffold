
import React from 'react'

interface DemoProps {
    history: any
    match: any
    location: any
}
const index = ({ history }: DemoProps) => {

    return <div >
        rhine 
        <ul>
            <li onClick={() => history.push('/rhine/base')}> 01 base</li>
            <li onClick={() => history.push('/rhine/error')}> 02 error</li>
            <li onClick={() => history.push('/rhine/extend')}> 03 extend</li>
            <li onClick={() => history.push('/rhine/config')}> 05 config</li>
            <li onClick={() => history.push('/rhine/cancel')}> 06 cancel</li>
        </ul>
    </div>
}

export default index