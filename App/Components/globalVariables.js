import { createContext, useState } from "react";


export const AppContext = createContext();
export function AppProvider({ children }) {
    const [userInfo, setUserInfo] = useState({ firstname: "Mark", lastname: "David", email: "john@gmail.com", image: null });
    const [estates, setEstates] = useState([]);
    const [estateGroups, setEstateGroups] = useState([]);
    const [createdEstates, setCreatedEstates] = useState([]);
    const [userUID, setUserUID] = useState("bThyJNVNURTZef9X2ChkLRZPJ2k2"); // Winner
    // const [userUID, setUserUID] = useState("wRb0XYo9b7hOXEeqnYMnZGBnpos1"); // MJ
    const [preloader, setPreloader] = useState(false);



    return (
        <AppContext.Provider value={{
            userInfo, setUserInfo,
            estates, setEstates,
            estateGroups, setEstateGroups,
            userUID, setUserUID,
            preloader, setPreloader,
            createdEstates, setCreatedEstates
        }}>
            {children}
        </AppContext.Provider>
    );

}