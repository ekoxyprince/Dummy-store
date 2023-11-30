$(document).ready(function(){
   $('form#createForm').submit(function(e){
    e.preventDefault()
    console.log(this)
    let formData = new FormData(this)
    $.ajax({
        method:'post',
        url:'/admin/products',
        data:formData,
        cache:false,
        contentType:false,
        processData:false,
        success:(data)=>{
            if(!data.success){
                iziToast.show({
                    message:data.body.data.msg,
                    messageColor:'orange',
                    title:data.body.status,
                    position:'topCenter',
                    titleColor:'red'
                })
            }else if(data.success){
                iziToast.show({
                    message:'Product Created successfully',
                    messageColor:'yellow',
                    title:data.body.status,
                    position:'topCenter',
                    titleColor:'green'
                })
                $('#exampleModalCenter').modal('toggle')
                $('.table').load(' .table')
            }
        }

    })
   })
   $('form#paymentForm').submit(function(e){
    e.preventDefault()
    $.ajax({
        method:'post',
        url:'/admin/payments',
        data:$('#paymentForm').serialize(),
dataType:'json',
        success:(data)=>{
            if(!data.success){
                iziToast.show({
                    message:data.body.data.msg,
                    messageColor:'orange',
                    title:data.body.status,
                    position:'topCenter',
                    titleColor:'red'
                })
            }else if(data.success){
                iziToast.show({
                    message:'Payment Created successfully',
                    messageColor:'yellow',
                    title:data.body.status,
                    position:'topCenter',
                    titleColor:'green'
                })
                $('#exampleModalCenter').modal('toggle')
                $('.table').load(' .table')
            }
        }

    })
   })
})