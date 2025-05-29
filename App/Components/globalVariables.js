import { createContext, useState } from "react";


export const AppContext = createContext();
export function AppProvider({ children }) {
    const [userInfo, setUserInfo] = useState({ firstname: "Mark", lastname: "David", email: "john@gmail.com", image: null });
    const [estates, setEstates] = useState([]);
    const [estateGroups, setEstateGroups] = useState([]);
    const [userUID, setUserUID] = useState("");
    const [preloader, setPreloader] = useState(false);


    return (
        <AppContext.Provider value={{
            userInfo, setUserInfo,
            estates, setEstates,
            estateGroups, setEstateGroups,
            userUID, setUserUID,
            preloader, setPreloader
        }}>
            {children}
        </AppContext.Provider>
    );

}