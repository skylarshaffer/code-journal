/* exported data */
interface Entry {
  title: string;
  photoUrl: string;
  notes: string;
  entryId: number;
}

let data = {
  view: 'entry-form',
  entries: [] as Entry[],
  editing: null,
  nextEntryId: 1,
};

const previousDataJSON = localStorage.getItem('data');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}

window.addEventListener('beforeunload', () => {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('data', dataJSON);
});
