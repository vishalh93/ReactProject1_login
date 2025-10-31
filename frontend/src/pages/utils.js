import {ToastContainer,toast} from 'react-toastify';
export const handleSuccess = (messege)=>{
    toast.success(messege, {
        position : "top-right"
    })
}

export const handleError = (messege)=>{
    toast.error(messege, {
        position : "top-right",
    })
}
