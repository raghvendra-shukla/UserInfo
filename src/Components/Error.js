import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
export const Error = () => {
    const navigate = useNavigate();
  return (
    useEffect(()=>{
        navigate('/')
    },[])
  ) 
}