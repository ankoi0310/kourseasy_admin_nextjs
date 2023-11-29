import firestore, { productCollection } from '@/firebase/config'
import { AppResponse, Product } from '@/lib/types'
import { collection, doc, getDoc, onSnapshot, setDoc, updateDoc } from '@firebase/firestore'

const productRef = collection(firestore, productCollection)

export const getProducts = (setProducts: (products: Product[]) => void) => {
  return onSnapshot(productRef, (snapshot) => {
    const products = snapshot.docs.map((doc) => doc.data()) as Product[]
    setProducts(products)
  }, (_) => {
    setProducts([])
  })
}

export const getProduct = async (id: string) => {
  return await getDoc(doc(productRef, id))
}

export const createProduct = async (product: Product): Promise<AppResponse> => {
  try {
    await setDoc(doc(productRef, product.id), product)
    
    return {
      success: true,
      code: 200,
      message: 'Create product successfully',
      data: product,
    }
  } catch (error) {
    return {
      success: false,
      code: 500,
      message: 'Create product failed',
    }
  }
}

export const updateProduct = async (product: Product) => {
  return await updateDoc(doc(productRef, product.id), product)
}
