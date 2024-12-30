//select items
const alert=document.querySelector('.alert');
const form=document.querySelector('.grocery-form');
const grocery=document.getElementById('grocery');
const submitBtn=document.querySelector('.submit-btn');
const container=document.querySelector('.grocery-container');
const list=document.querySelector('.grocery-list');
const clearBtn=document.querySelector('.clear-btn');

//edit option
let editElement;
let editFlag=false;
let editID='';
//submit form
form.addEventListener('submit',addItem);
//clear items
clearBtn.addEventListener('click',clearItems);


function addItem(e){
    e.preventDefault();
    //console.log(grocery.value);
    const value=grocery.value;
    const id=new Date().getTime().toString();
    if(value!== '' && editFlag===false){
       const element=document.createElement('article');
       element.classList.add('grocery-item');
       const attr=document.createAttribute('data-id');
       attr.value=id;
       element.setAttributeNode(attr);
       element.innerHTML=`   <p class="title">${value}</p>
       <div class="btn-container">
           <button type="button" class="edit-btn">
               <i class="fa fa-pencil-square" style="font-size:20px;color:green"></i>
           </button>
           <button type="button" class="delete-btn">
               <i class="fa fa-trash" style="font-size:20px;color:red"></i>
           </button> </div>`;
           const deleteBtn=element.querySelector('.delete-btn');
           const editBtn=element.querySelector('.edit-btn');
         
          deleteBtn.addEventListener('click',deleteItem);
          editBtn.addEventListener('click',editItem);
           //append child
           list.appendChild(element);
           //display success
           displayAlert('item added to the list','success');
           //show container
           container.classList.add('show-container');
           addToLocalStorage(id,value);
           setBackToDefault();
    }else if(value!=='' && editFlag===true){
        //console.log('editing');
        editElement.innerHTML=value;
        displayAlert('value changed successfully','success');
        editLocalStorage(editID,value);
    }else{
         displayAlert('please enter some items into your list','danger');
    }
}
function displayAlert(text,action){
    alert.textContent=text;
    alert.classList.add(`alert-${action}`);


    //remove alert
    setTimeout(function(){
        alert.textContent='';
        alert.classList.remove(`alert-${action}`);
    },1000)
}
function setBackToDefault(){
    //console.log('get back to default');
    grocery.value='';
    editFlag=false;
    editID='';
    submitBtn.textContent='submit';
}
function addToLocalStorage(id,value){
    //console.log('added to local storage');
    const grocery=(id,value);
    //console.log(grocery);
    let items=localStorage.getItem('list')?JSON.parse(localStorage.getItem('list')):[];
    console.log(items);
    items.push(grocery);
    localStorage.setItem('list',JSON.stringify(items));
    
}
function clearItems(){
    const items=document.querySelectorAll('.grocery-item');
    if(items.length>0){
        items.forEach(function(item){
            list.removeChild(item);
        })
    }container.classList.remove('show-container');
    displayAlert('empty','danger');
    localStorage.removeItem('list');
    setBackToDefault();
}
//delete function
function deleteItem(e){
    const element=e.currentTarget.parentElement.parentElement;
    const id=element.dataset.id;
    list.removeChild(element);
    if(list.children.length===0){
        container.classList.remove('show-container');
    }displayAlert(`The item is delted successfully`,'danger');
    
    setBackToDefault();
    //remove from local storage
    removeFromLocalStorage(id);
}
function removeFromLocalStorage(id){
   let items=getLocalStorage();
   items=items.filter(function(item){
    if(item.id!==id){
        return item;
    }
   })
   localStorage.setItem('list',JSON.stringify(items));
}
function editLocalStorage(id,value){
   let items=getLocalStorage();
   items=items.map(function(item){
    if(item.id===id){
        item.value=value;
    }return item;
   })
   localStorage.setItem('list',JSON.stringify(items));
}
function getLocalStorage(){
    return localStorage.getItem('list')?JSON.parse(localStorage.getItem('list')):[];
}
function editItem(e){
    const element=e.currentTarget.parentElement.parentElement;
    //set edit item
    editElement=e.currentTarget.parentElement.previousElementSibling;
    grocery.value=editElement.innerHTML;
    editFlag=true;
    editID=element.dataset.id;
    submitBtn.textContent='edit';
    editLocalStorage(id,value);
}
localStorage.setItem('orange',JSON.stringify(['item1','item2']));
const oranges=JSON.parse(localStorage.getItem('orange'));
//localStorage.removeItem('orange');
function setUpItems(){
    let items=getLocalStorage();
    if(items.length>0){

    }
}
function createListItem(id,value){

}
