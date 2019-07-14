import React, { useEffect, ReactNode } from 'react'
import rhine from './lib'
import axios from 'axios'

interface DemoProps {
    children?: ReactNode
    history?: any
    match?: any
    location?: any
}
const Base = ({ history }: DemoProps) => {
    useEffect(() => {
        rhine({
            method: 'get',
            url: 'http://pv.sohu.com/cityjson',
            params: {
                tool:"rhine",
                foo: ['bar', 'baz']
            }
        })
        axios({
            method: 'get',
            url: 'http://pv.sohu.com/cityjson',
            params: {
                tool:"axios",
                foo: ['bar', 'baz']
            }
        })

        // rhine({
        //     method: 'get',
        //     url: '/api/v0/demo',
        //     params: {
        //         tool: "rhine",
        //         foo: {
        //             bar: 'baz'
        //         }
        //     }
        // })

        // axios({
        //     method: 'get',
        //     url: '/api/v0/demo',
        //     params: {
        //         tool: "axios",
        //         foo: {
        //             bar: 'baz'
        //         }
        //     }
        // })

        // rhine({
        //     method: 'get',
        //     url: '/api/v0/demo',
        //     params: {
        //         tool: "rhine",
        //         foo: {
        //             bar: { zoo: 'zoo' }
        //         }
        //     }
        // })

        // axios({
        //     method: 'get',
        //     url: '/api/v0/demo',
        //     params: {
        //         tool: "axios",
        //         foo: {
        //             bar: { zoo: 'zoo' }
        //         }
        //     }
        // })

        // const date = new Date()

        // rhine({
        //     method: 'get',
        //     url: '/api/v0/demo',
        //     params: {
        //         date
        //     }
        // })
        // axios({
        //     method: 'get',
        //     url: '/api/v0/demo',
        //     params: {
        //         date
        //     }
        // })

        // rhine({
        //     method: 'get',
        //     url: '/api/v0/demo',
        //     params: {
        //         foo: '@:$, '
        //     }
        // })
        // axios({
        //     method: 'get',
        //     url: '/api/v0/demo',
        //     params: {
        //         foo: '@:$, '
        //     }
        // })

        // rhine({
        //     method: 'get',
        //     url: '/api/v0/demo',
        //     params: {
        //         foo: 'bar',
        //         baz: null
        //     }
        // })
        // axios({
        //     method: 'get',
        //     url: '/api/v0/demo',
        //     params: {
        //         foo: 'bar',
        //         baz: null
        //     }
        // })

        // rhine({
        //     method: 'get',
        //     url: '/api/v0/demo#hash',
        //     params: {
        //         foo: 'bar'
        //     }
        // })
        // axios({
        //     method: 'get',
        //     url: '/api/v0/demo#hash',
        //     params: {
        //         foo: 'bar'
        //     }
        // })

        // rhine({
        //     method: 'get',
        //     url: '/api/v0/demo?foo=bar',
        //     params: {
        //         bar: 'baz'
        //     }
        // })
        // axios({
        //     method: 'get',
        //     url: '/api/v0/demo?foo=bar',
        //     params: {
        //         bar: 'baz'
        //     }
        // })

        // rhine({
        //     method: 'post',
        //     url: '/api/v0/base/post',
        //     data: {
        //         tool: "rhine",
        //         a: 1,
        //         b: 2
        //     }
        // })
        // axios({
        //     method: 'post',
        //     url: '/api/v0/base/post',
        //     data: {
        //         tool: "axios",
        //         a: 1,
        //         b: 2
        //     }
        // })

        // rhine({
        //     method: 'post',
        //     url: '/api/v0/base/post',
        //     headers: {
        //         'content-type': 'application/json;charset=utf-8',
        //         'Accept': 'application/json,text/plain,*/*'
        //     },
        //     data: {
        //         a: 1,
        //         b: 2
        //     }
        // })

        // const arr = new Int32Array([21, 31])

        // rhine({
        //     method: 'post',
        //     url: '/api/v0/base/buffer',
        //     data: arr
        // })
        // axios({
        //     method: 'post',
        //     url: '/api/v0/base/buffer',
        //     data: arr
        // })


        // const paramsString = 'q=URLUtils.searchParams&topic=api'
        // const searchParams = new URLSearchParams(paramsString)

        // rhine({
        //     method: 'post',
        //     url: '/api/v0/base/post',
        //     data: searchParams
        // })
        // axios({
        //     method: 'post',
        //     url: '/api/v0/base/post',
        //     data: searchParams
        // })

        // rhine({
        //     method: 'post',
        //     url: '/api/v0/base/post',
        //     data: {
        //         a: 1,
        //         b: 2
        //     }
        // }).then((res) => {
        //     console.log(res)
        // })

        // axios({
        //     method: 'post',
        //     url: '/api/v0/base/post',
        //     data: {
        //         a: 1,
        //         b: 2
        //     }
        // }).then((res) => {
        //     console.log(res)
        // })

        // rhine({
        //     method: 'post',
        //     url: '/api/v0/base/post',
        //     // responseType: 'json',
        //     data: {
        //         a: 3,
        //         b: 4
        //     }
        // }).then((res) => {
        //     console.log(res)
        // })
        // axios({
        //     method: 'post',
        //     url: '/api/v0/base/post',
        //     // responseType: 'json',
        //     data: {
        //         a: 3,
        //         b: 4
        //     }
        // }).then((res) => {
        //     console.log(res)
        // })

    }, [1])
    return <div onClick={() => history.push('/rhine')}>rhine index</div>
}

export default Base