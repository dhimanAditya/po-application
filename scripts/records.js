function updateNote(id, value) {
    const objStore = db.transaction(OBJECT_STORE, "readwrite")
	.objectStore(OBJECT_STORE);

    const request = objStore.get(id);

    request.onsuccess = event => {
	let data = event.target.result;
	data.note = value;

	objStore.put(data);
    }
}

function updateTracker(received, weight, sacks) {
    let incomeElem = document.getElementById("income");
    let saleElem = document.getElementById("sale");
    let sacksElem = document.getElementById("sacks");

    incomeElem.innerText = "₹" + (parseInt(incomeElem.innerText.slice(1)) + parseInt(received));
    saleElem.innerText = parseFloat((parseFloat(saleElem.innerText) + parseFloat(weight)).toFixed(3))+"kg";
    sacksElem.innerText = (parseInt(sacksElem.innerText) + parseInt(sacks))+" sacks";
}

function showRecords(record) {
    let div = document.createElement("div");
    div.innerHTML = `<div class="bill-fields">
			<div>
			    <span class="field-name">Weight</span>
			    <span>${ record.weight }kg</span>
			</div>
			<div>
			    <span class="field-name">Price</span>
			    <span>₹${ record.price }</span>
			</div>
			<div>
			    <span class="field-name">Filling</span>
			    <span>₹${ record.filling }</span>
			</div>
			<div>
			    <span class="field-name">Sack</span>
			    <span>₹${ record.sack }</span>
			</div>
			<div class="highlighted-bill-field">
			    <span class="field-name">Total</span>
			    <span>₹${ record.total }</span>
			</div>
			<div class="highlighted-bill-field">
			    <span class="field-name">Received</span>
			    <span>₹${ record.received }</span>
			</div>
		    </div>
		    <div>
			<p>${ record.po_cost }/kg &nbsp;|&nbsp; ${ record.filling_cost }/filling &nbsp;|&nbsp; ${ record.sack_cost }/sack</p>
			<textarea onchange="updateNote(${record.id}, this.value)">${ record.note ? record.note : '' }</textarea>
			<button onclick="deleteRecord(this.parentNode.parentNode, ${ record.id }, ${ record.received }, ${ record.weight }, ${ record.sacks })">delete</button>
		    </div>`;

    document.getElementById("records").prepend(div);

    updateTracker(record.received, record.weight, record.sacks);
}

function fetchRecords(date) {
    document.getElementById("records").innerHTML = '';
    document.getElementById("income").innerText = "₹0";
    document.getElementById("sale").innerText = "0kg";
    document.getElementById("sacks").innerText = "0 sacks";

    date = new Date(date).toLocaleDateString();

    const objectStore = db.transaction(OBJECT_STORE, "readonly")
	.objectStore(OBJECT_STORE);

    let index = objectStore.index("date");
    let range = IDBKeyRange.only(date);

    const request = index.openCursor(range);

    request.onsuccess = event => {
	let cursor = event.target.result;

	if (cursor) {
	    showRecords(cursor.value);
	    cursor.continue();
	}
    }
}

function deleteRecord(elem, id, received, weight, sacks) {
    if (!confirm("Delete this record ?")) return;

    const request = db.transaction(OBJECT_STORE, "readwrite")
	.objectStore(OBJECT_STORE)
	.delete(id);

    request.onsuccess = () => {
	updateTracker(-received, -weight, -sacks);

	elem.remove();
    }
}
