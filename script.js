const tlMain = gsap.timeline();
const tlSub = gsap.timeline();

function revealSite() {
    tlMain.to(".pre-loader", 1, {
        opacity: 0,
        display: "none",
        ease: "power2.inOut",
    });

    tlMain.to(".header-row", 0.8, {
        top: "0",
        ease: "power4.inOut",
        stagger: {
            amount: 0.2,
        },
    },
        "-=1.2"
    );

    tlMain.from("nav > *, footer", 2, {
        y: 40,
        opacity: 0,
        ease: "power4.inOut",
        stagger: {
            amount: 0.2,
        },
    },
        "-=1"
    );
}


tlMain.to(".header > h1", 2, {
    top: 0,
    ease: "power3.inOut",
    stagger: {
        amount: 0.3,
    },
}).to(".pre-loader-btn", 0.3, {
    opacity: 1,
    delay: 2,
});

function reveal() {
    tlSub.to(".header-row", 0.8, {
        top: "0",
        ease: "power4.inOut",
        stagger: {
            amount: 0.2,
        },
    },
        "-=1.2"
    );

    tlSub.from("nav > *, footer", 2, {
        y: 40,
        opacity: 0,
        ease: "power4.inOut",
        stagger: {
            amount: 0.2,
        },
    },
        "-=1"
    );
}

window.addEventListener('DOMContentLoaded', renderAllReceipts);

function openmenu() {
    let sidemenu = document.querySelector(".sidemenu");
    sidemenu.style.right = "0"
}

function closemenu() {
    let sidemenu = document.querySelector(".sidemenu");
    sidemenu.style.right = "-200px"
}

const cardContainer = document.querySelector(".container");

window.addEventListener('DOMContentLoaded', renderAllReceipts);

function renderAllReceipts() {
    cardContainer.innerHTML = ''; 
    const receipts = JSON.parse(localStorage.getItem('allReceipts')) || [];

    receipts.forEach((receipt, index) => {
        createCard(receipt, index);
    });
}

function createCard(veryfiData, index) {
    console.log(veryfiData);
    if (veryfiData) {
        let card = document.createElement('div');
        let top = document.createElement('div');
        let receiptTitle = document.createElement('div');
        let receiptDesc = document.createElement('div');
        let receiptInfo = document.createElement('div');
        let receiptDetails = document.createElement('div');
        let receiptData1 = document.createElement('div');
        let receiptData2 = document.createElement('div');
        let receiptData3 = document.createElement('div');
        let btnContainer = document.createElement('div');
        let data1span1 = document.createElement('span');
        let data1span2 = document.createElement('span');
        let data2span1 = document.createElement('span');
        let data2span2 = document.createElement('span');
        let data3span1 = document.createElement('span');
        let data3span2 = document.createElement('span');
        let viewMore = document.createElement('button');
        let deleteBtn = document.createElement('button');
        let dollar = document.createElement('span');
        let price = document.createElement('span');
        let decimal = document.createElement('span');

        card.classList.add("card");
        top.classList.add("top");
        receiptTitle.classList.add("receipt-title");
        receiptDesc.classList.add("receipt-desc");
        receiptInfo.classList.add("receipt-info");
        receiptDetails.classList.add("receipt-details");
        receiptData1.classList.add("receipt-data");
        receiptData2.classList.add("receipt-data");
        receiptData3.classList.add("receipt-data");
        dollar.classList.add("dollar");
        price.classList.add("price");
        decimal.classList.add("decimal");
        deleteBtn.classList.add('delete-btn');
        btnContainer.classList.add('btnContainer');

        receiptTitle.innerHTML = veryfiData.category;
        dollar.innerHTML = "$";
        price.innerHTML = veryfiData.total - veryfiData.total % 1;
        decimal.innerHTML = padNumber(Math.round((veryfiData.total % 1) * 100));
        data1span1.innerHTML = "Vendor Name";
        data1span2.innerHTML = veryfiData.vendor.name;
        data2span1.innerHTML = "Date";
        data2span2.innerHTML = veryfiData.date;
        data3span1.innerHTML = "Number of Items";
        data3span2.innerHTML = veryfiData.line_items.length;
        viewMore.innerHTML = "View More";
        deleteBtn.innerText = 'Delete';

        viewMore.addEventListener('click', () => {
            window.location.href = 'receipt.html?index=' + index;
        });

        deleteBtn.addEventListener('click', () => {
            deleteReceipt(index);
        });

        receiptDesc.append(dollar, price, decimal);
        top.append(receiptTitle, receiptDesc);
        receiptData1.append(data1span1, data1span2);
        receiptData2.append(data2span1, data2span2);
        receiptData3.append(data3span1, data3span2);
        receiptDetails.append(receiptData1, receiptData2, receiptData3);
        btnContainer.append(viewMore, deleteBtn);
        card.append(top, receiptInfo, receiptDetails, btnContainer);
        cardContainer.append(card);
    }
}

function addReceipt(newReceipt) {
    const receipts = JSON.parse(localStorage.getItem('allReceipts')) || [];

    const newIndex = receipts.length;
    newReceipt.index = newIndex;

    receipts.push(newReceipt);

    localStorage.setItem('allReceipts', JSON.stringify(receipts));

    renderAllReceipts();
}

function deleteReceipt(index) {
    let receipts = JSON.parse(localStorage.getItem('allReceipts')) || [];

    receipts.splice(index, 1);

    receipts = receipts.map((receipt, newIndex) => {
        receipt.index = newIndex; // Reassign the new index
        return receipt;
    });

    localStorage.setItem('allReceipts', JSON.stringify(receipts));

    renderAllReceipts();
}

document.getElementById('submitBtn').addEventListener('click', () => {
    const file_url = document.getElementById('fileUrlInput').value;
    let veryfiData = null;

    fetch('http://localhost:3000/api/veryfi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file_url: file_url })
    })
        .then(res => res.json())
        .then(data => {
            veryfiData = data;

            addReceipt(veryfiData);
        })
        .catch(err => {
            console.error('Fetch error:', err);
        });
});

function padNumber(number) {
    return number < 10 ? '0' + number : number.toString();
}


