import {useFetchUser} from "../../lib/User";
import React, {ReactElement, ReactNode} from "react";

interface WithAuthProps {
    children: ReactNode
}

export default function WithAuth({ children }: WithAuthProps): ReactElement {
    const {loading, user} = useFetchUser();
    if (!loading && !user) {
        window.location.href = '/api/login';
    }
    return (
        <>
            {!loading ? children :
                <span>loading...</span>
            }
        </>
    )
}
