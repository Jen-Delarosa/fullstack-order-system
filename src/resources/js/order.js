let form = document.forms["addNewOrder"];
// ensure form is not null, form actually exists
if (!form) {
    console.log("INVALID FORM");

}





// by default dont display qunatity unless a product is selected 
document.getElementById("selectQuantity").style.display = "none";
function displayQuantity() {
    if (form.elements["Product"].value == "Products") {
        // if a product has not been selected 
        // hide quantity selecion and quanitty summary
        document.getElementById("selectQuantity").style.display = "none";
    }
    else {
        // display quantiy and total
        document.getElementById("selectQuantity").style.display = "block";
    }


}
// if a product is selected call display quantity 
form.elements["Product"].addEventListener("click", displayQuantity);
// function for tracking the total cost so far
function totalSummary() {
    item = form.elements["Product"].value;
    cost = 0;
    if (item == "Roses") {
        cost = 25;
    }
    if (item == "Blue Flowers") {
        cost = 30;
    }
    if (item == "Purple Flowers") {
        cost = 30;
    }
    amount = form.elements["quantity"].value;
    total = amount * cost;
    document.getElementById("Total").textContent = ("Total: $" + total + ".00");
}
// iif quantity input is selected update total
form.elements["quantity"].addEventListener("input", totalSummary);

// when the the pre-fill button is clicked fill in the form
prefill_button = document.getElementById("preFill");

prefill_button.addEventListener("click", () => {


    // prefill documents values when document is loaded 
    form.elements["Product"].value = "Roses";
    // product sleected so display quantity 
    displayQuantity();
    form.elements["quantity"].value = "7";
    // quanity specified so display summary 
    totalSummary();
    form.elements["from_name"].value = "John";
    form.elements["address"].value = "Person 1 \nThis is a valid address";
    form.elements["shipping"].value = "Expedited";


});
// Funciton that displays success message if an order was success or failed:
let successMsg = document.getElementById("successOrder");
let failMsg = document.getElementById("failOrder");
failMsg.style.display = "none";
successMsg.style.display = "none";
function showMessage(data){
    if (data.status == "success"){
        document.getElementById("orderNum").innerHTML =   
        "<a href=/tracking/" + data.order_id + ">" + "Your Order Id : " + data.order_id + "</a></p>"
    
        successMsg.style.display = "block";
         failMsg.style.display = "none";
    }
    if (data.status == "error"){
        document.getElementById("orderErr").textContent = "Errors: " + data.errors;  
        failMsg.style.display = "block";
        successMsg.style.display = "none";
    }
}

// adding the fetch request
const submit_button = document.getElementById("order_form");

submit_button.addEventListener("submit", async (page)=>{
    
    page.preventDefault();
  

    const response = await fetch("/api/order", {
    method: "POST",
    headers: {
        "Content-Type" : "application/json",
    },
    body: JSON.stringify({Product: form.elements["Product"].value,
        from_name: form.elements["from_name"].value,
        quantity: parseInt(form.elements["quantity"].value),
        address: form.elements["address"].value,
        shipping: form.elements["shipping"].value,
        remember_me: form.elements["remember_me"].checked,
    }),
   

    
    



});
    const data = await response.json();
    // console.log(data)
    if(data.status === "success"){
    
        showMessage(data);
  
        
    }


    if(data.status === "error"){
       
        showMessage(data)
    }
   
});
