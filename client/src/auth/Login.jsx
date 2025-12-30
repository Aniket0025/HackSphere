  
 const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const loginHandler = async ()=> {
        const res = await api.post('/auth/login', {email, password})
        localStorage.setItem('token', res.data.token)
        alert('Login successful')
    }

   return (
     <>
     <input type="text" placeholder='Email' onChange={e=> setEmail(e.target.value)} />
     <input type="password" placeholder='Password' onChange={e=> setPassword(e.target.value)} />

        <button onClick={loginHandler}>Login</button>
     </>
   )
 }
 
 export default Login