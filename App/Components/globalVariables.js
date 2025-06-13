import { createContext, useState } from "react";


export const AppContext = createContext();
export function AppProvider({ children }) {
    const [userInfo, setUserInfo] = useState({ firstname: "Mark", lastname: "David", email: "john@gmail.com", image: null });
    const [estates, setEstates] = useState([]);
    const [estateGroups, setEstateGroups] = useState([]);
    const [createdEstates, setCreatedEstates] = useState([]);
    const [estate, setEstate] = useState({});
    const [communities, setCommunities] = useState([]);
    const [estateContributions, setEstateContributions] = useState([]);
    const [docID, setDocID] = useState("");
    const [transactions, setTransactions] = useState([]);
    const [userUID, setUserUID] = useState("iy8xvghOdYgCpOk9VKysvlEFpyF3"); // Winner
    // const [userUID, setUserUID] = useState("TwZb1QAmUnQkTVGDfTiIlx6dbRK2"); // John
    const [preloader, setPreloader] = useState(false);


    return (
        <AppContext.Provider value={{
            docID, setDocID,
            estate, setEstate,
            userUID, setUserUID,
            estates, setEstates,
            userInfo, setUserInfo,
            preloader, setPreloader,
            communities, setCommunities,
            estateGroups, setEstateGroups,
            transactions, setTransactions,
            createdEstates, setCreatedEstates,
            estateContributions, setEstateContributions,
        }}>
            {children}
        </AppContext.Provider>
    );

}