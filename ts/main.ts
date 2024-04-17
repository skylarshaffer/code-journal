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
const $divEntries = document.querySelector(
  "div[data-view='entries']"
) as HTMLDivElement;
const $divEntryForm = document.querySelector(
  "div[data-view='entry-form']"
) as HTMLDivElement;
const $aEntries = document.querySelector('.navbar a') as HTMLAnchorElement;
const $aNEW = document.querySelector('a.button') as HTMLAnchorElement;
const $formTitle = document.querySelector('form h2') as HTMLHeadingElement;

//  error coverage
if (
  !$photoUrl ||
  !$formImg ||
  !$form ||
  !$ul ||
  !$liEmpty ||
  !$divEntries ||
  !$divEntryForm ||
  !$aEntries ||
  !$aNEW
)
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
  $ul.prepend(renderEntry(formSubmission));
  if ($liEmpty.className === 'empty') {
    toggleNoEntries();
  }
  viewSwap('entries');
});

//  $ul handleClick
$ul.addEventListener('click', (event: Event) => {
  viewSwap('entry-form');
  const eventTarget = event.target as HTMLAnchorElement;
  let i = 0;
  while (i < data.entries.length) {
    if (data.entries[i].entryId.toString() === eventTarget.dataset.entryId) {
      data.editing = data.entries[i];
    }
    i++;
  }
  $formTitle.textContent = 'Edit Entry';
});

//  render HTML element for entry
function renderEntry(entry: Entry): HTMLLIElement {
  //  li
  const $li = document.createElement('li');
  $li.className = 'entry';
  $li.dataset.entryId = entry.entryId.toString();
  //  div.row
  const $row = document.createElement('div');
  $row.className = 'row';
  //  div.column-half 1
  const $columnHalf1 = document.createElement('div');
  $columnHalf1.className = 'column-half';
  //  div.entry-item.image
  const $entryItemImage = document.createElement('div');
  $entryItemImage.className = 'entry-item image';
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
  $columnHalf2.className = 'column-half';
  //  div.entry-item.title
  const $entryItemTitle = document.createElement('div');
  $entryItemTitle.className = 'entry-item title hbar';
  //  h3
  const $h3 = document.createElement('h3');
  $h3.textContent = entry.title;
  //  i
  const $aPen = document.createElement('a');
  $aPen.className = 'fa-solid fa-pen';
  //  div.entry-item.notes
  const $entryItemNotes = document.createElement('div');
  $entryItemNotes.className = 'entry-item notes';
  //  p
  const $p = document.createElement('p');
  $p.textContent = entry.notes;
  //  generate DOM
  $entryItemImage.appendChild($img);
  $columnHalf1.appendChild($entryItemImage);
  $entryItemTitle.appendChild($h3);
  $entryItemTitle.appendChild($aPen);
  $columnHalf2.appendChild($entryItemTitle);
  $entryItemNotes.appendChild($p);
  $columnHalf2.appendChild($entryItemNotes);
  $row.appendChild($columnHalf1);
  $row.appendChild($columnHalf2);
  $li.appendChild($row);
  return $li;
}

//  document handleDOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  let i = 0;
  while (i < data.entries.length) {
    $ul.appendChild(renderEntry(data.entries[i]));
    i++;
  }
  const $liEntry = document.querySelector('li.entry') as HTMLLIElement;
  if ($liEmpty.className === 'empty' && $liEntry) {
    toggleNoEntries();
  }
  viewSwap(data.view);
});

//  toggle $li placeholder visibility
function toggleNoEntries(): void {
  if ($liEmpty.className === 'empty hidden') {
    $liEmpty.className = 'empty';
  } else if ($liEmpty.className === 'empty') {
    $liEmpty.className = 'empty hidden';
  }
}

//  swap views based on string input
function viewSwap(string: string): void {
  if (string === 'entries') {
    $divEntries.className = '';
    $divEntryForm.className = 'hidden';
  } else if (string === 'entry-form') {
    $divEntries.className = 'hidden';
    $divEntryForm.className = '';
  }
  data.view = string;
}

//  swap views based on clicked anchor
//  $aEntries handleClick
$aEntries.addEventListener('click', () => {
  viewSwap('entries');
});

//  $aNEW handleClick
$aNEW.addEventListener('click', () => {
  viewSwap('entry-form');
});
