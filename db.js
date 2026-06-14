const DB_NAME = 'BoilerDB';
const DB_VERSION = 2; // バージョンを2に上げて確実に更新
const STORE_NAME = 'inspectionLogs';
let dbInstance = null; // 開いたデータベースを保存しておく変数

// データベースを開く（1回開いたらそれを使い回す）
function getDB() {
    return new Promise((resolve, reject) => {
        if (dbInstance) {
            return resolve(dbInstance); // すでに開いていればそれを返す
        }
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onupgradeneeded = e => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
            }
        };
        request.onsuccess = e => {
            dbInstance = e.target.result; // 開いた接続を記録
            resolve(dbInstance);
        };
        request.onerror = e => reject(e.target.error);
    });
}

// データを保存する関数
function saveData(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await getDB();
            const tx = db.transaction(STORE_NAME, 'readwrite');
            const store = tx.objectStore(STORE_NAME);
            
            const request = store.add(data);
            request.onsuccess = () => resolve(true);
            request.onerror = (e) => reject(e.target.error);
        } catch (err) {
            reject(err);
        }
    });
}
// 全データを取り出す関数（追加）
function getAllData() {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await getDB();
            const tx = db.transaction(STORE_NAME, 'readonly');
            const store = tx.objectStore(STORE_NAME);
            const request = store.getAll();
            
            request.onsuccess = e => resolve(e.target.result);
            request.onerror = e => reject(e.target.error);
        } catch (err) {
            reject(err);
        }
    });
}

// データをすべて削除する関数（テスト用に便利なので追加）
function clearData() {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await getDB();
            const tx = db.transaction(STORE_NAME, 'readwrite');
            const store = tx.objectStore(STORE_NAME);
            const request = store.clear();
            
            request.onsuccess = () => resolve(true);
            request.onerror = e => reject(e.target.error);
        } catch (err) {
            reject(err);
        }
    });
}