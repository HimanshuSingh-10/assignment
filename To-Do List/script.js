const inputBox = document.getElementById("input-box");
const listConatiner = document.getElementById("list-container");
const totalQuantity = document.getElementById("total-quantity");

function addTask(){
    if(inputBox.value === ''){
        alert("You must write something!");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = `
        ${inputBox.value}
        <div class="quantity">
        <span class="icon" onclick="decreaseQuantity(this)">&#8722;</span>
        <span class="quantity-value">1</span>
        <span class="icon" onclick="increaseQuantity(this)">&#43;</span> 
        </div>
        <span onclick="removeTask(this)">\u00d7</span>
        `;
        listConatiner.appendChild(li)
        updateTotalQuantity();
    }
    inputBox.value = "";
}

function increaseQuantity(icon){
    let quantityValue = icon.previousElementSibling;
    quantityValue.textContent = parseInt(quantityValue.textContent) + 1;
    updateTotalQuantity();
}

function decreaseQuantity(icon){
    let quantityValue = icon.nextElementSibling;
    if(parseInt(quantityValue.textContent) > 1){
        quantityValue.textContent = parseInt(quantityValue.textContent) - 1;
        updateTotalQuantity();
    }
}

function removeTask(span){
    let itemQuantity = parseInt(span.previousElementSibling.querySelector(".quantity-value").textContent)
    span.parentElement.remove()
    updateTotalQuantity();
}

function updateTotalQuantity() {
    let quantities = document.querySelectorAll(".quantity-value")
    let total = 0;
    quantities.forEach(quantity => {
        total += parseInt(quantity.textContent)
    })
    totalQuantity.textContent = total;
}

listConatiner.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        let quantityValue = e.target.querySelector(".quantity-value");
        let itemQuantity = parseInt(quantityValue.textContent);

      if (e.target.classList.contains("checked")) {
        updateTotalQuantity(-itemQuantity);
      } else {
        updateTotalQuantity(itemQuantity);
      }
      
      e.target.classList.toggle("checked");

    }
}, false);