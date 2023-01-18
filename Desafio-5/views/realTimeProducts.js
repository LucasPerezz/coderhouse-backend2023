const send = document.getElementById('submitButton')

const socket = io();


send.addEventListener('click', (e)=>{
    e.preventDefault();
    let newProduct = {
        title: title.value,
        price: price.value,
        description: description.value,
        thumbnail:thumbnail.value,
        code: code.value,
        stock: stock.value,
        category: category.value
    }
    
    if (!!title.value || !!price.value || !!description.value || !!thumbnail.value || !!code.value || !product.stock || !product.category ) {

        socket.emit('send_message', newProduct);



    }

})


