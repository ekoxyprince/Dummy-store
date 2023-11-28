const menu = document.getElementById('menu')
const nav = document.querySelector('nav')
const header = document.querySelector('header')
const imgs = document.querySelectorAll('#img')
const blurredDiv = document.querySelectorAll('.blurred__img')
const productBtns = document.querySelectorAll('#product-btn')
const closeProductModalBtn = document.getElementById('productmodal-close')
const cartBtn = document.getElementById('cart-btn')
const cartBtn2 = document.getElementById('cart-btn2')
const cartContainer = document.querySelector('.cart__container')
const cartClose = document.getElementById('cart-close')
menu.addEventListener('click',()=>{
    nav.classList.toggle('active')
    menu.classList.toggle('fa-times')
})
document.addEventListener('scroll',()=>{
    if(window.scrollY >0){
        header.classList.add('sticky')
    }else{
        header.classList.remove('sticky')
    }
})
function loadedImg(a){
  for(let i = 0; i<=blurredDiv.length-1;i++){
    blurredDiv[a].classList.add('loaded')
  }
}
for(let i =0; i<=imgs.length-1;i++){
    if(imgs[i].complete){
        loadedImg(i)
    }else{
        imgs[i].addEventListener('load',()=>{
          loadedImg(i)
        })
    }
}
for(let i = 0; i<=productBtns.length -1; i++ ){
    productBtns[i].onclick = ()=>{
        let modal = new bootstrap.Modal(document.getElementById('product-modal',{}))
        modal.show()
        closeProductModalBtn.onclick = ()=>{
        modal.hide()
        }
    }
}
cartBtn.onclick = ()=>{
    cartContainer.classList.toggle('show')
}
cartBtn2.onclick = ()=>{
    cartContainer.classList.toggle('show') 
}
cartClose.onclick = ()=>{
    cartContainer.classList.remove('show')
}


