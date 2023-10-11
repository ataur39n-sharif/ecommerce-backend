import {TOrderLineItems} from "@/App/modules/Orders/order.types";

const processOrderAmountDetails = (payload:TOrderLineItems[])=>{
    let total=0;
    let subTotal=0;
    let shippingCost =0;

    for (const lineItem of payload){
        subTotal+=Number(lineItem.price)*Number(lineItem.quantity)
    }

    total= subTotal+shippingCost

    return{
        subTotal,
        shippingCost,
        total
    }
}

export const OrderUtils={
    processOrderAmountDetails
}