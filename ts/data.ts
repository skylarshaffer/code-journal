/* exported data */
interface Entry {
  title: string;
  photoUrl: string;
  notes: string;
  entryId: number;
}

interface Data {
  view: string;
  entries: Entry[];
  editing: null;
  nextEntryId: number;
}

let data: Data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

//  retrieve cached posts if they exist
const previousDataJSON = localStorage.getItem('data');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}

//  store posts in cache if reload
window.addEventListener('beforeunload', () => {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('data', dataJSON);
});
