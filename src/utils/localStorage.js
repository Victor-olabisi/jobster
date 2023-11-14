
export const addUserLocalStorage = (user) => {
    localStorage.setItem('user', JSON.stringify(user))
}

export const removerUserLocalStorage = (user) => {
    localStorage.removeItem(user)
}

export const getUserLocalStorage = () => {
   const user= localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
    return user
}