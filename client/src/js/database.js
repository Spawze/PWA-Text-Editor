import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });
//add database data.
export const putDb = async (content) => {
  const db = await openDB('jate', 1)
  const result = await db
  .transaction('jate','readwrite')
  .objectStore('jate')
  .put({id: 0,value: content})
  console.log(result)
  return result
};

//get database data
export const getDb = async () => {
  const db = await openDB('jate',1)
  const result = await db
  .transaction('jate','readonly')
  .objectStore('jate')
  .get(0)
  return result
};

initdb();
