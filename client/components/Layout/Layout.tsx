import React, {ReactElement, ReactNode} from 'react'
import {useRouter} from 'next/router'
import {
    Layout as RMDLayout,
    Configuration,
    ConfigurableIcons,
    useLayoutNavigation,
    ArrowDropDownSVGIcon,
    CheckBoxSVGIcon,
    FileDownloadSVGIcon,
    KeyboardArrowDownSVGIcon,
    KeyboardArrowLeftSVGIcon,
    KeyboardArrowRightSVGIcon,
    MenuSVGIcon,
    NotificationsSVGIcon,
    RadioButtonCheckedSVGIcon,
    RemoveRedEyeSVGIcon,
    ArrowUpwardSVGIcon,
    CheckSVGIcon,
    DropdownMenu,
    Avatar
} from 'react-md'

import LinkUnstyled from '../LinkUnstyled'
import navItems from './navItems'
import {useFetchUser} from "../../lib/User";

const icons: ConfigurableIcons = {
    back: <KeyboardArrowLeftSVGIcon/>,
    checkbox: <CheckBoxSVGIcon/>,
    dropdown: <ArrowDropDownSVGIcon/>,
    download: <FileDownloadSVGIcon/>,
    expander: <KeyboardArrowDownSVGIcon/>,
    forward: <KeyboardArrowRightSVGIcon/>,
    menu: <MenuSVGIcon/>,
    notification: <NotificationsSVGIcon/>,
    radio: <RadioButtonCheckedSVGIcon/>,
    password: <RemoveRedEyeSVGIcon/>,
    selected: <CheckSVGIcon/>,
    sort: <ArrowUpwardSVGIcon/>,
}

interface LayoutProps {
    children: ReactNode
}

// Check out the documentation for Configuring your Layout for more information:
// - https://react-md.dev/guides/configuring-your-layout
export default function Layout({children}: LayoutProps): ReactElement {
    const {pathname} = useRouter()

    return (
        <Configuration icons={icons}>
            <RMDLayout
                navHeaderTitle="My Purpose"
                tabletLayout="temporary"
                landscapeTabletLayout="temporary"
                desktopLayout="toggleable"
                largeDesktopLayout="toggleable"
                treeProps={useLayoutNavigation(navItems, pathname, LinkUnstyled)}
                appBarProps={{children: menu()}}
            >
                {children}
            </RMDLayout>
        </Configuration>
    )
}

const menu = (): React.ReactNode => {
    const user = useFetchUser();
    const picture = (user.user?.picture) ? user.user?.picture : '';

    return (
        <DropdownMenu
            id="menu"
            items={[{ href: "/api/logout", children: "Logout" }]}
            buttonType="icon"
            aria-label="Options..."
            first
        >
            <Avatar src={picture}/>

        </DropdownMenu>
    )
}
