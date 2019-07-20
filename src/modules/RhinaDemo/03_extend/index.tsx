import React, { useEffect, ReactNode } from 'react'
import rhine from './dist/rhine.es5'
import axios from 'axios'

interface DemoProps {
    children?: ReactNode
    history?: any
    match?: any
    location?: any
}
const Index = ({ history }: DemoProps) => {
    useEffect(() => {
        // rhine({
        //   url: '/api/v0/extend/get',
        //   method: 'get',
        //   data: {
        //     msg: 'hi'
        //   }
        // })
        // rhine({
        //   url: '/api/v0/extend/post',
        //   method: 'post',
        //   data: {
        //     msg: 'hi'
        //   }
        // })
        //
        // rhine.request({
        //   url: '/api/v0/extend/post',
        //   method: 'post',
        //   data: {
        //     msg: 'hello'
        //   }
        // })

        // rhine.get('/api/v0/extend/get')

        // rhine.options('/extend/options')

        // rhine.delete('/api/v0/extend/delete')

        // rhine.head('/api/v0/extend/head')

        // rhine.post('/api/v0/extend/post', { msg: 'post' })

        // rhine.put('/api/v0/extend/put', { msg: 'put' })

        // rhine.patch('/api/v0/extend/patch', { msg: 'patch' })

        // rhine({
        //   url: '/api/v0/extend/post',
        //   method: 'post',
        //   data: {
        //     msg: 'hi'
        //   }
        // })

        // rhine('/api/v0/extend/post', {
        //   method: 'post',
        //   data: {
        //     msg: 'hello'
        //   }
        // })

        interface ResponseData<T = any> {
            code: number
            result: T
            message: string
        }

        interface User {
            name: string
            age: number
        }

        function getUser<T>() {
            // return rhine<ResponseData<T>>('/extend/user')
            //     .then(res => res.data)
            //     .catch(err => console.error(err))
        }


        // async function test() {
        //     const user = await getUser<User>()
        //     if (user) {
        //         console.log(user.result.name)
        //     }
        // }

        // test()
    }, [1])
    return <div onClick={() => history.push('/rhine')}>rhine index</div>
}

export default Index