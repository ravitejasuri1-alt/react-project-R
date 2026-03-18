import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";

import biryaniImg from "./assets/images/biryani.jpg";
import pizzaImg from "./assets/images/pizza.jpg";
import mandiImg from "./assets/images/mandi.jpg";
import tandooriImg from "./assets/images/tandoori.webp";
import butterImg from "./assets/images/butter.webp";
import burgerImg from "./assets/images/burger.jpg";
import friedriceImg from "./assets/images/friedrice.webp";
import buttertandooriImg from "./assets/images/buttertandoori.webp";
import tfc2Img from "./assets/images/tfc2.jpg";
import muttonImg from "./assets/images/mutton.webp";
import muttonpulavImg from "./assets/images/muttonpulav.webp";
import fishfryImg from "./assets/images/fishfry.jpg";
import fishcurryImg from "./assets/images/fishcurry.jpg";
import "./App.css";
const restaurants = [
{
id:1,
name:"Spicy Hub",
location:"Hyderabad",
rating:4.3,
image:biryaniImg,
menu:[
{id:1,name:"Biryani",price:250,image:biryaniImg},
{id:2,name:"Butter Chicken",price:300,image:butterImg}
]
},
{
id:2,
name:"Pizza Palace",
location:"Bangalore",
rating:4.1,
image:pizzaImg,
menu:[
{id:1,name:"Veg Pizza",price:200,image:pizzaImg},
{id:2,name:"Burger",price:150,image:burgerImg}
]
},
{
id:3,
name:"Mandi Palace",
location:"Hyderabad",
rating:4.4,
image:mandiImg,
menu:[
{id:1,name:"Chicken Mandi",price:500,image:mandiImg},
{id:2,name:"Fried Chicken Mandi",price:1000,image:friedriceImg}
]
},
{
id:4,
name:"Tandoori Hub",
location:"Hyderabad",
rating:4.2,
image:tandooriImg,
menu:[
{id:1,name:"Fried Tandoori",price:250,image:tandooriImg},
{id:2,name:"Butter Tandoori",price:300,image:buttertandooriImg}
]
},
{
id:5,
name:"Mutton Palace",
location:"Hyderabad",
rating:4.4,
image:muttonpulavImg,
menu:[
{id:1,name:"Mutton pulav",price:1100,image:muttonImg},
{id:2,name:"Mutton Biryani",price:2000,image:muttonpulavImg}
]
},
{
id:6,
name:"Fish Palace",
location:"Hyderabad",
rating:4.2,
image:fishfryImg,
menu:[
{id:1,name:"Fish fry",price:400,image:fishcurryImg},
{id:2,name:"Fish curry",price:500,image:fishfryImg}
]
}

];

function App(){
    const [isLoggedIn,setIsLoggedIn] = useState(false);

const [cart,setCart]=useState([]);
const [orders,setOrders]=useState([]);
useEffect(() => {

speechSynthesis.cancel();   // previous speech stop

const msg = new SpeechSynthesisUtterance("Welcome to T F C.");

msg.lang = "en-US";
msg.rate = 1;
msg.pitch = 1;

speechSynthesis.speak(msg);

}, []);

const addToCart=(item)=>{
setCart([...cart,item]);
};

const placeOrder=(item)=>{
setOrders([...orders,item]);
};

return(

<Router>

<div style={styles.navbar}>

<div style={styles.logo}>
<img src={tfc2Img} alt="logo" style={styles.logoImage} className="rotate-logo"/>
<span style={{marginLeft:"10px"}}>Teja Food-Court</span>
</div>

<input
type="text"
placeholder="Search restaurants..."
style={styles.navSearch}
/>

<div style={styles.navLinks}>

<Link to="/" style={styles.link}>Home</Link>

<Link to="/cart" style={styles.link}>
Cart <span style={styles.badge}>{cart.length}</span>
</Link>

<Link to="/orders" style={styles.link}>
Orders <span style={styles.badge}>{orders.length}</span>
</Link>

{isLoggedIn ? (
<Link to="/account" style={styles.link}>Account</Link>
) : (
<Link to="/login">
<button style={styles.loginBtn}>Login</button>
</Link>
)}

<Link to="/signup">
<button style={styles.signupBtn}>Sign Up</button>
</Link>

</div>

</div>

<Routes>

<Route path="/" element={<Home/>}/>
<Route path="/account" element={<Account setIsLoggedIn={setIsLoggedIn}/>}/>
<Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>}/>

<Route
path="/menu/:id"
element={<RestaurantMenu addToCart={addToCart} placeOrder={placeOrder}/>}
/>

<Route path="/cart" element={<Cart cart={cart}/>}/>

<Route path="/orders" element={<Orders orders={orders}/>}/>



<Route path="/signup" element={<Signup/>}/>

</Routes>

</Router>

)
}

function Home(){

const [visible,setVisible] = useState(3);
const [page,setPage] = useState(1);

const itemsPerPage = 3;

const start = (page - 1) * itemsPerPage;
const end = start + visible;

const currentRestaurants = restaurants.slice(start, end);
const totalPages = Math.ceil(restaurants.length / itemsPerPage);

const [hovered,setHovered] = useState(null);

return(

<div style={styles.container}>

{/* Pagination Buttons Top */}

<div style={{textAlign:"center",marginBottom:"20px"}}>

{Array.from({length:totalPages},(_,i)=>(

<button
key={i}
onClick={()=>setPage(i+1)}
style={{
...styles.button,
margin:"5px",
background: page === i+1 ? "black" : "#e23744"
}}
>
{i+1}
</button>

))}

</div>

<div style={styles.cardContainer}>

{currentRestaurants.map((res)=>(

<div
key={res.id}
style={{
...styles.card,
transform: hovered === res.id ? "scale(1.08)" : "scale(1)",
transition:"0.3s"
}}
onMouseEnter={()=>setHovered(res.id)}
onMouseLeave={()=>setHovered(null)}
>

<img src={res.image} alt={res.name} style={styles.menuImage}/>

<h3>{res.name}</h3>
<p>{res.location}</p>
<p>⭐ {res.rating}</p>

<Link to={`/menu/${res.id}`}>
<button style={styles.button}>View Menu</button>
</Link>

</div>

))}

</div>

{/* Show More */}

{visible < restaurants.length && (
<div style={{textAlign:"center",marginTop:"20px"}}>
<button
style={styles.button}
onClick={()=>setVisible(restaurants.length)}
>
Show More
</button>
</div>
)}

</div>

)
}
function RestaurantMenu({addToCart,placeOrder}){
   
const {id}=useParams();


const [showForm, setShowForm] = useState(false);
const [selectedItem, setSelectedItem] = useState(null);
const [address, setAddress] = useState("");
const [mobile, setMobile] = useState("");
const restaurant=restaurants.find((r)=>r.id===parseInt(id));

return(

<div style={styles.container}>

<h2>{restaurant.name} Menu</h2>
<img
src={restaurant.image}
alt={restaurant.name}
style={{width:"350px",borderRadius:"10px",marginBottom:"20px"}}
/>

{restaurant.menu.map((item)=>(

<div key={item.id} style={styles.menuCard}>

<img src={item.image} alt={item.name} style={styles.image}/>

<div style={{flex:1}}>
<h3>{item.name}</h3>
<p>₹{item.price}</p>
</div>

<button style={styles.button} onClick={()=>addToCart(item)}>
Add Cart
</button>

<button
style={{...styles.button,background:"green"}}
onClick={()=>{
setSelectedItem(item);
setShowForm(true);
}}
>
Order
</button>

</div>

))}

{showForm && (
<div style={{
position: "fixed",
top: "50%",
left: "50%",
transform: "translate(-50%, -50%)",
background: "white",
padding: "20px",
borderRadius: "10px",
boxShadow: "0 0 10px rgba(0,0,0,0.3)",
zIndex: 2000
}}>

<h3>Enter Details</h3>

<input
type="text"
placeholder="Address"
value={address}
onChange={(e)=>setAddress(e.target.value)}
style={{...styles.input, width:"90%", margin:"0 auto", display:"block"}}
/>

<br/><br/>

<input
type="text"
placeholder="Mobile Number"
value={mobile}
onChange={(e)=>setMobile(e.target.value)}
style={{...styles.input, width:"90%", margin:"0 auto", display:"block"}}
/>

<br/><br/>

<button
style={styles.button}
onClick={()=>{
if(address === "" || mobile === ""){
alert("Please fill all details");
return;
}

placeOrder({
...selectedItem,
address,
mobile
});

alert("Order Placed Successfully ✅");

setShowForm(false);
setAddress("");
setMobile("");
}}
>
Confirm Order
</button>

<br/><br/>

<button
style={{...styles.button, background:"gray"}}
onClick={()=>setShowForm(false)}
>
Cancel
</button>

</div>
)}

</div>
)
}

function Cart({cart}){

const total=cart.reduce((sum,item)=>sum+item.price,0);

return(

<div style={styles.container}>

<h2>Cart</h2>

{cart.length===0 ? (
<p>No items</p>
):(
<>
{cart.map((item,index)=>(
<p key={index}>{item.name} - ₹{item.price}</p>
))}
<h3>Total ₹{total}</h3>
</>
)}

</div>
)
}

function Orders({orders}){

return(

<div style={styles.container}>

<h2>My Orders</h2>

{orders.length===0 ? (
<p>No orders</p>
):(
orders.map((item,index)=>(
<p key={index}>{item.name} - ₹{item.price}</p>
))
)}

</div>
)
}

function Login({setIsLoggedIn}){

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const submit=(e)=>{
e.preventDefault();

const user = JSON.parse(localStorage.getItem("user"));

if(user && user.email === email && user.password === password){
alert("Login Successful");
setIsLoggedIn(true);
}else{
alert("Invalid Email or Password");
}

};

return(

<div style={styles.container}>

<h2>Login</h2>

<form onSubmit={submit} style={{maxWidth:"400px"}}>

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
style={styles.input}
/>

<br/><br/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
style={styles.input}
/>

<br/><br/>

<button style={styles.button}>Login</button>

</form>

</div>
)
}

function Signup(){

const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [mobile,setMobile]=useState("");
const [password,setPassword]=useState("");

const submit=(e)=>{
e.preventDefault();

const user={
name,
email,
mobile,
password
};

localStorage.setItem("user",JSON.stringify(user));

alert("Signup Success");
};

return(

<div style={styles.container}>

<h2>Sign Up</h2>

<form onSubmit={submit} style={{maxWidth:"400px"}}>

<input
placeholder="Name"
value={name}
onChange={(e)=>setName(e.target.value)}
style={styles.input}
/>

<br/><br/>

<input
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
style={styles.input}
/>

<br/><br/>

<input
placeholder="Mobile"
value={mobile}
onChange={(e)=>setMobile(e.target.value)}
style={styles.input}
/>

<br/><br/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
style={styles.input}
/>

<br/><br/>

<button style={styles.button}>Submit</button>

</form>

</div>
)
}
function Account({setIsLoggedIn}){

const user = JSON.parse(localStorage.getItem("user"));

const logout = () => {
setIsLoggedIn(false);
alert("Logged Out");
};

return(

<div style={styles.container}>

<h2>My Account</h2>

<p>Name: {user?.name}</p>
<p>Email: {user?.email}</p>
<p>Mobile: {user?.mobile}</p>

<br/>

<button
style={{...styles.button,background:"black"}}
onClick={logout}
>
Logout
</button>

</div>

)

}
const styles={

logoImage:{
height:"45px",
width:"45px",
borderRadius:"50%",
objectFit:"cover"
},
navbar:{
width:"100%",
background:"#e23744",
color:"white",
padding:"15px 40px",
display:"flex",
alignItems:"center",
justifyContent:"space-between",
position:"fixed",
top:0,
left:0,
zIndex:1000,   
boxSizing:"border-box"
},

logo:{
fontSize:"24px",
fontWeight:"bold"
},

navSearch:{
width:"35%",
padding:"8px",
borderRadius:"6px",
border:"none"
},

navLinks:{
display:"flex",
alignItems:"center",
gap:"15px"
},

link:{
color:"white",
textDecoration:"none"
},

badge:{
background:"white",
color:"#e23744",
borderRadius:"50%",
padding:"3px 8px"
},

loginBtn:{
background:"white",
color:"#e23744",
border:"none",
padding:"6px 14px",
cursor:"pointer",
borderRadius:"4px"
},

signupBtn:{
background:"black",
color:"white",
border:"none",
padding:"6px 14px",
cursor:"pointer",
borderRadius:"4px"
},

container:{
padding:"120px 20px"
},

cardContainer:{
display:"grid",
gridTemplateColumns:"repeat(3, 1fr)",
gap:"80px",
width:"100%",
padding:"20px"
},
card:{
width:"100%",
background:"white",
padding:"15px",
borderRadius:"8px",
boxShadow:"0 4px 8px rgba(0,0,0,0.1)",
textAlign:"center"
},

image:{
width:"120px",
height:"90px",
objectFit:"cover",
borderRadius:"8px"
},

menuCard:{
display:"flex",
alignItems:"center",
justifyContent:"space-between",
gap:"20px",
marginBottom:"20px"
},

menuImage:{
width:"100%",
height:"180px",
objectFit:"cover",
borderRadius:"8px"
},

button:{
background:"#e23744",
color:"white",
border:"none",
padding:"8px 12px",
cursor:"pointer",
whiteSpace:"nowrap"
},

input:{
width:"100%",
padding:"10px",
border:"1px solid #ccc"
}

};

export default App;