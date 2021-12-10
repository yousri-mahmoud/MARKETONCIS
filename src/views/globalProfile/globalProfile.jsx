import React from 'react'
import ProfileBase from '../../components/globalProfile/ProfileBase'
import {Helmet} from "react-helmet";


const globalProfile = () => {
    return (
        <div>
              <Helmet>
                <meta charSet="utf-8" />
                <title>Global Profile</title>
            </Helmet>
            <ProfileBase />
        </div>
    )
}

export default globalProfile
