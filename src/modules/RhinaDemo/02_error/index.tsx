import React, { useEffect, ReactNode } from 'react'
import rhine from './lib'
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
        //     method: 'get',
        //     url: '/api/v0/error/get1'
        // }).then((res) => {
        //     console.log(res)
        // }).catch((e) => {
        //     console.log(e)
        // })
        // axios({
        //     method: 'get',
        //     url: '/api/v0/error/get1'
        // }).then((res) => {
        //     console.log(res)
        // }).catch((e) => {
        //     console.log(e)
        // })

        rhine({
            method: 'get',
            url: '/api/v0/error/get'
        }).then((res) => {
            console.log(res)
        }).catch((e) => {
            console.log(e)
        })
        axios({
            method: 'get',
            url: '/api/v0/error/get'
        }).then((res) => {
            console.log(res)
        }).catch((e) => {
            console.log(e)
        })

        // setTimeout(() => {
        //     rhine({
        //         method: 'get',
        //         url: '/api/v0/error/get'
        //     }).then((res) => {
        //         console.log(res)
        //     }).catch((e) => {
        //         console.log(e)
        //     })
        //     axios({
        //         method: 'get',
        //         url: '/api/v0/error/get'
        //     }).then((res) => {
        //         console.log(res)
        //     }).catch((e) => {
        //         console.log(e)
        //     })
        // }, 5000)

        //   axios({
        //     method: 'get',
        //     url: '/error/timeout',
        //     timeout: 2000
        //   }).then((res) => {
        //     console.log(res)
        //   }).catch((e: AxiosError) => {
        //     console.log(e.message)
        //     console.log(e.config)
        //     console.log(e.code)
        //     console.log(e.request)
        //     console.log(e.isAxiosError)
        //   })

    }, [1])
    return <div onClick={() => history.push('/rhine')}>rhine index</div>
}

export default Index