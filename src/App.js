import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { toggleActions } from './store/ui-slice';

let isInitail = true;
function App() {
  const show = useSelector(state => state.toggler.show)
  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch();
  const notification = useSelector(state => state.toggler.notification)

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(toggleActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data...'
      }))
      const response = await fetch('https://advanced-redux-card-data-default-rtdb.firebaseio.com/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify(cart)
        })
      if (!response.ok) {
        throw new Error("Sending Cart data failed.")
      }
      dispatch(toggleActions.showNotification({
        status: 'success',
        title: 'Success!',
        message: 'Sent cart data Successfully!'
      }))
      // const responseData = await response.json(); //as no need here
    };
    if (isInitail) {
      isInitail = false
      return;
    }
    sendCartData().catch(error => {
      dispatch(toggleActions.showNotification({
        status: 'error',
        title: 'Error!',
        message: 'Sending cart data failed'
      }))
    })

  }, [cart, dispatch])

  return (
    <Fragment>
      {notification && <Notification
        status={notification.status}
        title={notification.title}
        message={notification.message}
      />}
      <Layout>
        {show && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
