import React from 'react'
import ProfileBase from '../../components/Profile/ProfileBase'
import {Helmet} from "react-helmet";


const profile = () => {
  return (
    <section>
         <Helmet>
                <meta charSet="utf-8" />
                <title>Profile</title>
            </Helmet>
        <ProfileBase />
    </section>
  )
}

export default profile

