import React, { useEffect, ReactNode } from "react";
import rhine from "./dist/lib/index";
import axios from "axios";
import qs from "qs";

interface DemoProps {
  children?: ReactNode;
  history?: any;
  match?: any;
  location?: any;
}
const Index = ({ history }: DemoProps) => {
  useEffect(() => {
    // rhine.defaults.headers.common['test2'] = 123
    // rhine({
    //   url: '/api/v0/config/post',
    //   method: 'post',
    //   data: qs.stringify({
    //     a: "rhine"
    //   }),
    //   headers: {
    //     test: 'rhine'
    //   }
    // }).then((res:any) => {
    //   console.log(res.data)
    // })
    // axios({
    //     url: '/api/v0/config/post',
    //     method: 'post',
    //     data: qs.stringify({
    //       a: "axios"
    //     }),
    //     headers: {
    //       test: 'axios'
    //     }
    //   }).then((res:any) => {
    //     console.log(res.data)
    //   })
    
    // rhine({
    //   transformRequest: [(function(data:any) {
    //     return qs.stringify(data)
    //   }), ...(axios.defaults.transformRequest as any[])],
    //   transformResponse: [...(axios.defaults.transformResponse as any[]), function(data:any) {
    //     if (typeof data === 'object') {
    //       data.b = 2
    //     }
    //     return data
    //   }],
    //   url: '/api/v0/config/post',
    //   method: 'post',
    //   data: {
    //     a: 1
    //   }
    // }).then((res:any) => {
    //   console.log(res.data)
    // })

    const instance = rhine.create({
      transformRequest: [
        function(data:any) {
          return qs.stringify(data);
        },
        ...(axios.defaults.transformRequest as any[])
      ],
      transformResponse: [
        ...(axios.defaults.transformResponse as any[]),
        function(data:any) {
          if (typeof data === "object") {
            data.b = 2;
          }
          return data;
        }
      ]
    });

    instance({
      url: "/api/v0/config/post",
      method: "post",
      data: {
        a: 1
      }
    }).then((res:any) => {
      console.log(res.data);
    });
  }, [1]);
  return <div onClick={() => history.push("/rhine")}>rhine index</div>;
};

export default Index;
