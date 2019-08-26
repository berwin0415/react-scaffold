import React, { FC, useEffect,ReactNode } from 'react'
import{Button} from 'antd'
const Home: FC = (props:any) => {
    const {history} = props
    return (
        <div onClick={() => history.push('/demo/page1')}><Button>aaa</Button>      </div>
    );
}
export default Home
