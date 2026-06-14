// データベース名：BoilerDB
const DB_NAME = 'BoilerDB';
const DB_VERSION = 1;
const STORE_NAME = 'inspectionLogs';

// データベースを開く（なければ作る）
function getDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onupgradeneeded = e => {
            e.target.result.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        };
        request.onsuccess = e => resolve(e.target.result);
        request.onerror = e => reject(e.target.error);
    });
}

// データを保存する関数
async function saveData(data) {
    const db = await getDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).add(data);
    return tx.complete;
}