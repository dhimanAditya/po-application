const saveForm = document.getElementById("save-form");

saveForm.addEventListener("submit", e => {
    e.preventDefault();

    let po_cost = localStorage.getItem("po_cost");
    let filling_cost = localStorage.getItem("filling_cost");
    let sack_cost = localStorage.getItem("sack_cost");
    let sacks = parseInt(document.getElementById("seller-sacks").value) + parseInt(document.getElementById("buyer-sacks").value);
    let weight = document.getElementById("weight").innerText.replace("kg", '');
    let price = document.getElementById("price").innerText.replace('₹', '');
    let filling = document.getElementById("filling").innerText.replace('₹', '');
    let sack = document.getElementById("sack").innerText.replace('₹', '');
    let total = document.getElementById("total").innerText.replace('₹', '');
    let received = saveForm.elements["received"].value;

    const data = {
	po_cost: po_cost,
	filling_cost: filling_cost,
	sack_cost: sack_cost,
	sacks: sacks,
	weight: weight,
	price: price,
	filling: filling,
	sack: sack,
	total: total,
	received: received,
	date: new Date().toLocaleDateString()
    };

    const request = db.transaction(OBJECT_STORE, "readwrite")
	.objectStore(OBJECT_STORE)
	.add(data);

    request.onsuccess = event => {
	dateChanged(Date.now());

	document.getElementById("values-inputs").reset();
	saveForm.reset();
    }
});
