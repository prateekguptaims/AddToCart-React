import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-router-dom';
import "./style.css"
import { useDispatch, useSelector } from 'react-redux';
import { Table } from '@mui/material';
import { DLT } from '../redux/actions/action';

const Header = () => {

const getdata=useSelector((state)=>state.cartreducer.carts)
//console.log(getdata)
const [price, setprice] = useState(0)
//console.log(price)


  const dispatch=useDispatch()

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const dlt=(id)=>{
      dispatch(DLT(id))
    }

const total=()=>{
  let price=0;
  getdata.map((e)=>{
    price=(e.price* e.qnty) +price;
  })
  setprice(price);
}
useEffect(() => {
 total()
}, [total])


  return (
   <>   
   <Navbar bg="dark" variant="dark" style={{height:"60px"}}>
        <Container>
          <NavLink to="/" className="text-decoration-none text-light mx-3">Add to Cart</NavLink>
          <Nav className="me-auto">
            <NavLink to="/" className="text-decoration-none text-light">Home</NavLink>
           
          </Nav>
          <Badge badgeContent={getdata.length} color="primary" id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}>
          <i className="fa-solid fa-cart-shopping text-light " style={{fontSize:"25px",cursor:"pointer"}}></i>
    </Badge>
         
        </Container>
        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {
            getdata.length?
            <div className='card-details' style={{width:"24rem",padding:10}}>
                <Table>
                    <thead>
                    <tr>
                        <th>Photos</th>
                        <th>Name</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            getdata.map((e,k)=>{
                                return (
                                    <>
                                    <tr>
                                        <td>
                                            <NavLink to={`cart/${e.id}`} onClick={handleClose}>

                                            <img src={e.imgdata} alt="" style={{width:"5rem",height:"5rem"}}/>
                                            </NavLink>
                                        </td>
                                        <td>
                                            <p>{e.rname}</p>
                                            <p>Price {e.price}</p>
                                            <p>Qty {e.qnty}</p>
                                            <p onClick={()=>dlt(e.id)}><i className='fas fa-trash smalltrash'  style={{color:"red",cursor:"pointer"}}></i></p>
                                        </td>
                                        <td className='mt-5'>
                                        <i onClick={()=>dlt(e.id)} className='fas fa-trash largetrash' style={{color:"red",cursor:"pointer"}}></i>
                                        </td>
                                    </tr>
                                    </>
                                )
                            })
                        }
                        <p className="text-center">Total: {price}</p>
                    </tbody>
                </Table>
            </div>:
            <div className='card_details d-flex justify-content-center align-items-center' style={{widows:"24rem",padding:"10"}}>
            <i className='fas fa-close smallclose' onClick={handleClose} style={{position:"absolute",top:2,right:20,fontSize:23,cursor:"pointer"}}></i>   
           <p style={{fontSize:23}}>Your cart is empty</p>
           <img src='./cart.gif' alt='cart' className='emptycart_img' style={{width:"5rem",padding:10}}/>
       </div>
        }
        
      </Menu>
      </Navbar>
      </>
  )
}

export default Header