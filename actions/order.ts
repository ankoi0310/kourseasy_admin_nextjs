import firestore, { orderCollection } from '@/firebase/config'
import { AppResponse, Order } from '@/lib/types'
import { collection, doc, getDoc, onSnapshot, setDoc, updateDoc } from '@firebase/firestore'

const orderRef = collection(firestore, orderCollection)

export const getOrders = (setOrders: (orders: Order[]) => void) => {
  return onSnapshot(orderRef, (snapshot) => {
    const orders = snapshot.docs.map((doc) => doc.data()) as Order[]
    
    setOrders(orders)
  }, (error) => {
    setOrders([])
  })
}

export const getOrder = async (id: string) => {
  return await getDoc(doc(orderRef, id))
}

export const createOrder = async (order: Order): Promise<AppResponse> => {
  try {
    await setDoc(doc(orderRef, order.id), order)
    
    return {
      success: true,
      code: 200,
      message: 'Create order successfully',
      data: order,
    }
  } catch (error) {
    return {
      success: false,
      code: 500,
      message: 'Create order failed',
    }
  }
}

export const updateOrder = async (id: string, order: Order) => {
  return await updateDoc(doc(orderRef, id), order)
}
