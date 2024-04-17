/* global data */
//  FormElements extended interface
interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  photoUrl: HTMLInputElement;
  notes: HTMLTextAreaElement;
}

//  DOM queries
const $photoUrl = document.querySelector('#photoUrl') as HTMLInputElement;
const $formImg = document.querySelector('#formImg') as HTMLImageElement;
const $form = document.querySelector('form') as HTMLFormElement;
const $ul = document.querySelector('ul') as HTMLUListElement;
const $liEmpty = document.querySelector('li.empty') as HTMLLIElement;

//  error coverage
if (!$photoUrl || !$formImg || !$form || !$ul || !$liEmpty)
  throw new Error('One of the dom queries failed');

//  $photoUrl handleInput
$photoUrl.addEventListener('input', (event: Event) => {
  const eventTarget = event.target as HTMLInputElement;
  if (eventTarget.checkValidity()) {
    $formImg.setAttribute('src', eventTarget.value);
    $formImg.setAttribute('alt', 'Your image');
  } else {
    $formImg.setAttribute('src', 'images/placeholder-image-square.jpg');
    $formImg.setAttribute('alt', 'Placeholder image');
  }
});

//  $form handleSubmit
$form.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const $formElements: FormElements = $form.elements as FormElements;
  const formSubmission = {
    title: $formElements.title.value,
    photoUrl: $formElements.photoUrl.value,
    notes: $formElements.notes.value,
    entryId: data.nextEntryId,
  };
  data.nextEntryId++;
  data.entries.unshift(formSubmission);
  $formImg.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
});

function renderEntry(entry: Entry): HTMLLIElement {
  //  li
  const $li = document.createElement('li');
  $li.setAttribute('class', 'entry');
  //  div.row
  const $row = document.createElement('div');
  $row.setAttribute('class', 'row');
  //  div.column-half 1
  const $columnHalf1 = document.createElement('div');
  $columnHalf1.setAttribute('class', 'column-half');
  //  div.entry-item.image
  const $entryItemImage = document.createElement('div');
  $entryItemImage.setAttribute('class', 'entry-item image');
  //  img
  const $img = document.createElement('img');
  $img.setAttribute('src', entry.photoUrl);
  $img.setAttribute('alt', 'Your image');
  $img.setAttribute(
    'onerror',
    "this.src='images/placeholder-image-square.jpg';this.alt='Placeholder image'"
  );
  //  div.column-half 2
  const $columnHalf2 = document.createElement('div');
  $columnHalf2.setAttribute('class', 'column-half');
  //  div.entry-item.title
  const $entryItemTitle = document.createElement('div');
  $entryItemTitle.setAttribute('class', 'entry-item title');
  //  h3
  const $h3 = document.createElement('h3');
  $h3.textContent = entry.title;
  //  div.entry-item.notes
  const $entryItemNotes = document.createElement('div');
  $entryItemNotes.setAttribute('class', 'entry-item notes');
  //  p
  const $p = document.createElement('p');
  $p.textContent = entry.notes;
  //  Generate DOM
  $entryItemImage.appendChild($img);
  $columnHalf1.appendChild($entryItemImage);
  $entryItemTitle.appendChild($h3);
  $columnHalf2.appendChild($entryItemTitle);
  $entryItemNotes.appendChild($p);
  $columnHalf2.appendChild($entryItemNotes);
  $row.appendChild($columnHalf1);
  $row.appendChild($columnHalf2);
  $li.appendChild($row);
  return $li;
}

document.addEventListener('DOMContentLoaded', () => {
  let i = 0;
  while (i < data.entries.length) {
    $ul.appendChild(renderEntry(data.entries[i]));
    i++;
  }
});

//  Delete if allowed
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function toggleNoEntries(): void {
  if ($liEmpty.className === 'empty hidden') {
    $liEmpty.setAttribute('class', 'empty');
  } else if ($liEmpty.className === 'empty') {
    $liEmpty.setAttribute('class', 'empty hidden');
  }
}

//  Alternatives I'm using for now
function showNoEntries(): void {
  $liEmpty.setAttribute('class', 'empty');
}

function hideNoEntries(): void {
  $liEmpty.setAttribute('class', 'empty hidden');
}

console.log(showNoEntries(), hideNoEntries());
