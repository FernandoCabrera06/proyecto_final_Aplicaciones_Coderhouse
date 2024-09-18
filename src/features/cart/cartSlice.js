import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
    total: 0
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItemCart: (state, action) => {
            const { id, price, quantity } = action.payload
            const itemFound = state.items.find(item => item.id === id)
            if (itemFound) {
                itemFound.quantity += quantity
            } else {
                state.items.push(action.payload)
            }
            state.total += price * quantity
        },
        removeItem: (state, action) => {
            const itemId = action.payload
            const itemIndex = state.items.findIndex(item => item.id === itemId)
            if (itemIndex >= 0) {
                state.total -= state.items[itemIndex].price * state.items[itemIndex].quantity
                state.items.splice(itemIndex, 1)
            }
        },
        clearCart: (state) => {
            state.items = []
            state.total = 0
        },
        incrementItemQuantity: (state, action) => {
            const itemId = action.payload
            const item = state.items.find(item => item.id === itemId)
            if (item) {
                item.quantity += 1
                state.total += item.price
            }
        },
        decrementItemQuantity: (state, action) => {
            const itemId = action.payload
            const item = state.items.find(item => item.id === itemId)
            if (item && item.quantity > 1) {
                item.quantity -= 1
                state.total -= item.price
            }
        }
    }
})

export const { addItemCart, removeItem, clearCart, incrementItemQuantity, decrementItemQuantity } = cartSlice.actions

export default cartSlice.reducer
