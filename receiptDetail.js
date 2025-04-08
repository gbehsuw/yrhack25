function getReceiptFromStorage(index) {
    const receipts = JSON.parse(localStorage.getItem('allReceipts'));
    console.log(receipts)
    if (receipts && receipts[index]) {
        return receipts[index];
    } else {
        console.log("Receipt not found!");
        return null;
    }
}
// Extract the 'index' parameter from the URL
const urlParams = new URLSearchParams(window.location.search);
const index = urlParams.get('index');

// Get the receipt based on the index
const receipt = getReceiptFromStorage(index);

// Function to format number with leading zero (if needed)
function padNumber(num) {
    return num < 10 ? '0' + num : num;
}

function renderReceipt() {
    let name = receipt.bill_to_name || 'Unknown';    
    let category = receipt.category || 'Misc.';    
    let country_code = receipt.country_code || 'N/A';    
    let created_date = receipt.created_date || 'N/A';    
    let date = receipt.date || 'N/A';    
    let currency_code = receipt.currency_code || 'N/A';    
    let line_items_num = receipt.line_items.length || 0;   
    let payment_display_name = receipt.payment.display_name || 'N/A';    
    let payment_type = receipt.payment.type || 'N/A';   
    let subtotal = receipt.subtotal || 0;    
    let total = receipt.total || 0;    
    let tax = receipt.tax || 0;  
    let vendor_name = receipt.vendor.name || 'Unknown';     
    let vendor_address = receipt.vendor.address || 'Unknown';     
    let vendor_type = receipt.vendor.type || 'Unknown';     
    let vendor_category = receipt.vendor.category || 'Misc.';     
    let vendor_phone_number = receipt.vendor.phone_number || 'N/A';     
    let vendor_web = receipt.vendor.web || 'N/A';     
    
    let items = document.querySelectorAll(".item");
    
    console.log(items)
    if (items) {
        items[0].innerHTML = date;
        items[1].innerHTML = created_date;
        items[2].innerHTML = category;
        items[3].innerHTML = name;
        items[4].innerHTML = currency_code;
        items[5].innerHTML = subtotal;
        items[6].innerHTML = tax;
        items[7].innerHTML = total;
        items[8].innerHTML = vendor_name;
        items[9].innerHTML = vendor_type;
        items[10].innerHTML = vendor_category;
        items[11].innerHTML = vendor_phone_number;
        items[12].innerHTML = vendor_address;
    }

    let img = document.querySelector(".receiptimg");
}

// Call renderReceipt when the page loads
renderReceipt();

var tablinks = document.getElementsByClassName("tab-link");
var tabcontents = document.getElementsByClassName("tab-content");

function opentab(tabname){
    for(tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for(tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }

    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab")
}