var db;

const DB_NAME = "po_db";
const DB_VERSION = 1;
const OBJECT_STORE = "sale_record";

const request = indexedDB.open(DB_NAME, DB_VERSION);

request.onupgradeneeded = event => {
    const db = event.target.result;

    const objectStore = db.createObjectStore(OBJECT_STORE, { keyPath: "id", autoIncrement: true });

    objectStore.createIndex("po_cost", "po_cost");
    objectStore.createIndex("filling_cost", "filling_cost");
    objectStore.createIndex("sack_cost", "sack_cost");
    objectStore.createIndex("sacks", "sacks");
    objectStore.createIndex("weight", "weight");
    objectStore.createIndex("price", "price");
    objectStore.createIndex("filling", "filling");
    objectStore.createIndex("sack", "sack");
    objectStore.createIndex("total", "total");
    objectStore.createIndex("received", "received");
    objectStore.createIndex("note", "note");
    objectStore.createIndex("date", "date");
}

request.onsuccess = event => {
    db = event.target.result;
}

request.onerror = () => {
    alert("Database Open Error");
}
