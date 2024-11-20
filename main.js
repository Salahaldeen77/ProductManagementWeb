//functions:
//get total price
//create product
//save local storage
//clear inputs
//read
//count
//delete
//update
//search
//clean data
//************************************** */
let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit');
//console.log(title,price,taxes,ads,discount,total,count,category,submit);
 
let mode='create';
let temp;

function getTotal()
{
    if(price.value !='')
    {
                         //if(+price.value > +taxes.value && +price.value >= +ads.value){ // check if price > taxes and ads
        let result= (+price.value + +taxes.value + +ads.value) - +discount.value; // + => using to convert from string to number
        total.innerHTML=result;
        total.style.background='#040';
    }
    else{
        //  document.insertBefore(price)='error th taxes or ads more than price';
        total.innerHTML='0';
        total.style.background='red';
    }

    //}
}

let dataProducts;
if (localStorage.product != null){
    dataProducts=JSON.parse(localStorage.product);
}
else{
    dataProducts=[];
}

submit.onclick=function(){
    let newProduct={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()
    }
    if(title.value !='' && price.value !='' && category.value !='' && count.value <100)
    {
        if(mode==='create')
        {
            if(newProduct.count >1)
            {
                for(let i=0;i<newProduct.count;i++)
                {
                    dataProducts.push(newProduct);
                }
            }
            else
            {
                dataProducts.push(newProduct);
            }
        }
        else
        {
            dataProducts[temp]=newProduct;
            count.style.display='block';
            mode='create';
            submit.innerHTML='Create';
        }
        clearDataFromInputs();//call clear Data From Inputs  
    }
        
    //save local storage
    localStorage.setItem('product', JSON.stringify(dataProducts));
    
    showData(); //show data in table
}
//
function clearDataFromInputs(){
title.value='';
price.value='';
taxes.value='';
ads.value='';
discount.value='';
total.innerHTML='';
count.value='';
category.value='';
}

//red
function showData(){
    getTotal();

    let table='';
    for(let i =0; i < dataProducts.length;i++){
        table +=`
        <tr>
            <td>${i}</td>
            <td>${dataProducts[i].title}</td>
            <td>${dataProducts[i].price}</td>
            <td>${dataProducts[i].taxes}</td>
            <td>${dataProducts[i].ads}</td>
            <td>${dataProducts[i].discount}</td>
            <td>${dataProducts[i].total}</td>
            <td>${dataProducts[i].category}</td>
            <td><button onclick=updateData(${i}) id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
         `;
        }
        document.getElementById('tbody').innerHTML=table;

        let btndeleteAll=document.getElementById('deleteAll');
        if(dataProducts.length > 0){
            btndeleteAll.innerHTML=`
            <button onclick="deleteAll()" >delete All(${dataProducts.length})</button>
            `
        }
        else{
            btndeleteAll.innerHTML='';
        }
}
showData();

//delete
function deleteData(i){
dataProducts.splice(i,1);
localStorage.product = JSON.stringify(dataProducts);
showData();
}

function deleteAll(){
    localStorage.clear();
    dataProducts.splice(0);
    showData();
}

//update product
function updateData(i){
    title.value=dataProducts[i].title;
    price.value=dataProducts[i].price;
    taxes.value=dataProducts[i].taxes;
    ads.value=dataProducts[i].ads;
    discount.value=dataProducts[i].discount;
    category.value=dataProducts[i].category ;
    submit.innerHTML='Update';
    mode='update'; 
    getTotal();
    count.style.display='none';
    temp=i;

    scroll({
        top:0,
        behavior:'smooth'
    })
}

//serach
let searchMode='title';
function getSearchMode(id){
    let search=document.getElementById('search');
    if(id=='searchTitle'){
        searchMode='title';
    }
    else{
        searchMode='category';
    }
    search.placeholder='Search By '+searchMode;
    search.focus();
    search.value='';
    showData();
}

function searchData(value)
{
    let table='';
    for(let i=0;i < dataProducts.length;i++)
    {
        if(searchMode=='title')
        {
            if(dataProducts[i].title.includes(value.toLowerCase()))
            {
                table +=`
                <tr>
                    <td>${i}</td>
                    <td>${dataProducts[i].title}</td>
                    <td>${dataProducts[i].price}</td>
                    <td>${dataProducts[i].taxes}</td>
                    <td>${dataProducts[i].ads}</td>
                    <td>${dataProducts[i].discount}</td>
                    <td>${dataProducts[i].total}</td>
                    <td>${dataProducts[i].category}</td>
                    <td><button onclick=updateData(${i}) id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>
                 `;
            }
        
        }
        else
        {
            if(dataProducts[i].category.includes(value.toLowerCase()))
            {
                table +=`
                <tr>
                    <td>${i}</td>
                    <td>${dataProducts[i].title}</td>
                    <td>${dataProducts[i].price}</td>
                    <td>${dataProducts[i].taxes}</td>
                    <td>${dataProducts[i].ads}</td>
                    <td>${dataProducts[i].discount}</td>
                    <td>${dataProducts[i].total}</td>
                    <td>${dataProducts[i].category}</td>
                    <td><button onclick=updateData(${i}) id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>
                `;
            }
        }
    }
    document.getElementById('tbody').innerHTML=table;
}