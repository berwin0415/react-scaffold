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
    const CancelToken = rhine.CancelToken;
    const source = CancelToken.source();

    rhine
      .get("/api/v0/cancel/get", {
        cancelToken: source.token
      })
      .catch(function(e: any) {
        if (rhine.isCancel(e)) {
          console.log("Request canceled", e.message);
        }
      });

    setTimeout(() => {
      source.cancel("Operation canceled by the user.");

      rhine
        .post("/cancel/post", { a: 1 }, { cancelToken: source.token })
        .catch(function(e:any) {
            // console.log(e)
          if (rhine.isCancel(e)) {
            console.log(e.message);
          }
        });
    }, 100);

    let cancel: any;

    rhine
      .get("/api/v0/cancel/get", {
        cancelToken: new CancelToken((c: any) => {
            console.log("c",c)
          cancel = c;
        })
      })
      .catch(function(e: any) {
        if (rhine.isCancel(e)) {
          console.log("Request canceled");
        }
      });

    setTimeout(() => {
      cancel();
    }, 1000);
  }, [1]);
  return <div onClick={() => history.push("/rhine")}>rhine index</div>;
};

export default Index;
