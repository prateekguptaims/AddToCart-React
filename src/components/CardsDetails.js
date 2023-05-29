import React, { useEffect, useState } from 'react'
// import Nav from 'react-bootstrap/Nav';
import Table from 'react-bootstrap/Table';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { ADD, DLT, REMOVE } from '../redux/actions/action';


const CardsDetails = () => {
  
    const [data, setdata] = useState([])
    //console.log(data)
    const {id}=useParams();
    //console.log(id)

    const getdata=useSelector((state)=>state.cartreducer.carts)
    //console.log(getdata)
    const compare=()=>{
        let comparedata=getdata.filter((e)=>{
            return e.id == id

        })
        setdata(comparedata)
    }
useEffect(() => {
 compare()
}, [id])

const history=useNavigate()
const dispatch=useDispatch()
const dlt=(id)=>{
    dispatch(DLT(id))
    history("/")
  }

  
    const send=(e)=>{
        
        dispatch(ADD(e))
    }
    const remove=(item)=>{
        dispatch(REMOVE(item))
    }



  return (
    <div className='container mt-2'>
        <h2 className='text-center'>Items Details</h2>
        
        <section className='container mt-3'>
            <div className='iteamsdetails'>
                {
                   data.map((e,k)=>{
                    return(
                        <>
                          <div className='items_img'>
                <img src={e.imgdata} alt="image" className=''/>
            </div>
            <div className='details' >
    <Table>
        <tr>
            <td>
                <p><b>Resaurant:</b>{e.rname}</p>
                <p><b>Price:</b>{e.price}</p>
                <p><b>Dishes:</b>{e.address}</p>
                <p><b>Total:</b>{e.price * e.qnty}</p>
                <div className='mt-5 d-flex justify-content-between align-items-center' style={{width:100,cursor:"pointer",background:"#ddd",color:"#111"}}>
                    <span style={{fontSize:24}} onClick={e.qnty<=1?()=>dlt(e.id):()=>remove(e)}>-</span>
                    <span style={{fontSize:22}}>{e.qnty}</span>
                    <span style={{fontSize:24}} onClick={()=>send(e)}>+</span>
                    
                </div>
            </td>
            <td>
            <p><b>Ratings: </b><span style={{background:"green",color:"#fff",padding:"5px 10px",borderRadius:"5px"}}>{e.rating} </span></p>
            <p><b>Order Reiew: </b><span >{e.somedata}</span></p>
            <p ><b>Remove: </b><span ><i  onClick={()=>dlt(e.id)} className='fas fa-trash' style={{color:"red",cursor:"pointer"}}></i> </span></p>
            </td>
        </tr>
    </Table>
            </div>
                        </>
                    )
                   }) 
                }
          
            </div>
        </section>
    </div>

  )
}

export default CardsDetails