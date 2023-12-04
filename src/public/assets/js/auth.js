const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const loginForm = document.getElementById('loginForm');
const signinForm = document.getElementById('signinForm');


loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

signinForm.addEventListener('submit',(e)=>{
  e.preventDefault()
 const body = {email:document.getElementById('email').value,password:document.getElementById('password').value}
 fetch('/auth/signin',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(body)
 }).then(res=>res.json())
 .then(data=>{
    if(!data.success){
        iziToast.show({
            message:data.body.data.msg,
            messageColor:'orange',
            title:data.body.status,
            position:'topCenter',
            titleColor:'red'
        })
    }else if(data.success){
        setTimeout(()=>{window.location.href = '/admin/dashboard'},1000)
        iziToast.show({
            message:data.body.data.msg,
            messageColor:'yellow',
            title:data.body.status,
            position:'topCenter',
            titleColor:'green'
        })
    }
 })
})
