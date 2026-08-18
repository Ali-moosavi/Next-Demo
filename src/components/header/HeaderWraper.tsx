'use client'
import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAppDispatch , useAppSelector } from "@/redux/setup/hooks";
import { GetProductsAction } from "@/redux/features/products/ProductsService";
import type { SUCCES_PRODUCTS_TYPE } from "@/redux/features/products/ProductsType";
import MainHeader from "./MainHeader";


export default function HeaderWraper (){

    const{products} = useAppSelector(state=>state.Productstate)

    const dispatch= useAppDispatch()

    useEffect(()=>{
        dispatch(GetProductsAction())
       
    },[dispatch])
     const Location = usePathname()
     let Headerstates = false
    let CategoryHeader = false
     

    products?.forEach((category) => {
        if (Location.startsWith(`/category/${category.categoryid}/`)){
            Headerstates = true
            console.log(Headerstates)
        }
    })

    if (Location.startsWith(`/category/`)){
            CategoryHeader = true
        }
    if (Location.startsWith(`/category`)){
            CategoryHeader = true
        }
        
    return <div><MainHeader Headerstates={Headerstates} CategoryHeader={CategoryHeader}/></div>
}