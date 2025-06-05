import { createContext, useState } from "react";


export const AppContext = createContext();
export function AppProvider({ children }) {
    const [userInfo, setUserInfo] = useState({ firstname: "Mark", lastname: "David", email: "john@gmail.com", image: null });
    const [estates, setEstates] = useState([]);
    const [estateGroups, setEstateGroups] = useState([]);
    const [createdEstates, setCreatedEstates] = useState([]);
    const [communities, setCommunities] = useState([]);
    const [docID, setDocID] = useState("");
    // const [userUID, setUserUID] = useState("bThyJNVNURTZef9X2ChkLRZPJ2k2"); // Winner
    const [userUID, setUserUID] = useState("wRb0XYo9b7hOXEeqnYMnZGBnpos1"); // MJ
    const [preloader, setPreloader] = useState(false);


    return (
        <AppContext.Provider value={{
            docID, setDocID,
            userUID, setUserUID,
            estates, setEstates,
            userInfo, setUserInfo,
            preloader, setPreloader,
            communities, setCommunities,
            estateGroups, setEstateGroups,
            createdEstates, setCreatedEstates
        }}>
            {children}
        </AppContext.Provider>
    );

}