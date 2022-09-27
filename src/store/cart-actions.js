import { cartActions } from "./cart-slice"
import { toggleActions } from "./ui-slice"

export const sendCartData = (cart) => {

    return async (dispatch) => {

        dispatch(toggleActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data...'
        }))
        const sendRequest = async () => {

            const response = await fetch('https://advanced-redux-card-data-default-rtdb.firebaseio.com/cart.json',
                {
                    method: 'PUT',
                    // body: JSON.stringify(cart)
                    body: JSON.stringify({
                        items: cart.items,
                        totalQuantity: cart.totalQuantity
                    })

                })
            if (!response.ok) {
                throw new Error("Sending Cart data failed.")
            }
        }
        try {
            await sendRequest();
            dispatch(toggleActions.showNotification({
                status: 'success',
                title: 'Success!',
                message: 'Sent cart data Successfully!'
            }))

        } catch (error) {
            dispatch(toggleActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Sending cart data failed'
            }))
        }

    }
}

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchdata = async () => {
            const response = await fetch('https://advanced-redux-card-data-default-rtdb.firebaseio.com/cart.json')

            if (!response.ok) {
                throw new Error('Could not fetch cart data!')
            }
            const data = await response.json();

            return data;
        }
        try {
            const cartData = await fetchdata();
            // dispatch(cartActions.replaceCart(cartData))
            dispatch(cartActions.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity,
            }))

        } catch (error) {
            dispatch(toggleActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Fetching cart data failed'
            }))
        }

    }
}