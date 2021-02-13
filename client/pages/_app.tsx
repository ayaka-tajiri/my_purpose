import React, {ReactElement} from 'react'
import {AppProps} from 'next/app'

import '../styles/app.scss'
import '@fullcalendar/common/main.css'
import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/timegrid/main.css'
import Layout from "../components/Layout";

export default function App({Component, pageProps}: AppProps): ReactElement {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
}
