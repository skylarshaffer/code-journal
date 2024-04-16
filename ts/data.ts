/* exported data */
interface Entry {
  title: string;
  photoUrl: string;
  notes: string;
  entryId: number;
}

const data = {
  view: 'entry-form',
  entries: [] as Entry[],
  editing: null,
  nextEntryId: 1,
};

console.log(data);
