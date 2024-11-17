import { createContext, useContext, useState, useEffect } from "react";

const StateContext = createContext();

export const State = () => useContext(StateContext)

export const StateProvider = ({children}) => {
    const [showCreatePost, setShowCreatePost] = useState(false)
    const [editingId, setEditingId] = useState(false)
    const [selectedUserId, setSelectedUserId] = useState(false)

    return (
        <StateContext.Provider value={{
            showCreatePost, 
            setShowCreatePost,
            editingId,
            setEditingId,
            selectedUserId,
            setSelectedUserId
            }}>
            {children}
        </StateContext.Provider>
    )
}
