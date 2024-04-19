/* global data */
//  INTERFACES
//    I.1   FormElements
interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  photoUrl: HTMLInputElement;
  notes: HTMLTextAreaElement;
}

//  DOM
//    D.1   variable definition
//      D.1.header
const $aEntries = document.querySelector('.navbar a') as HTMLAnchorElement;
//      D.1.entry-form
const $divEntryForm = document.querySelector(
  'div[data-view="entry-form"]'
) as HTMLDivElement;
const $form = $divEntryForm.querySelector('form') as HTMLFormElement;
const $photoUrl = $form.querySelector('#photoUrl') as HTMLInputElement;
const $title = $form.querySelector('#title') as HTMLInputElement;
const $notes = $form.querySelector('#notes') as HTMLTextAreaElement;
const $formImg = $form.querySelector('#formImg') as HTMLImageElement;
const $formHeading = $form.querySelector('form h2') as HTMLHeadingElement;
const $deleteEntry = $form.querySelector('#delete-entry') as HTMLAnchorElement;
//      D.1.entries
const $divEntries = document.querySelector(
  'div[data-view="entries"]'
) as HTMLDivElement;
const $aNew = $divEntries.querySelector('#new') as HTMLAnchorElement;
const $ul = $divEntries.querySelector('ul') as HTMLUListElement;
//      D.1.dialog
const $dialog = document.querySelector('dialog') as HTMLDialogElement;
const $cancel = $dialog.querySelector('#cancel') as HTMLAnchorElement;
const $confirm = $dialog.querySelector('#confirm') as HTMLAnchorElement;

//    D.2   domQueries object
const domQueries: Record<string, any> = {
  $aEntries,
  $divEntryForm,
  $form,
  $photoUrl,
  $title,
  $notes,
  $formImg,
  $formHeading,
  $deleteEntry,
  $divEntries,
  $aNew,
  $ul,
  $dialog,
  $cancel,
  $confirm,
};

//    D.3   error checking
for (const key in domQueries) {
  if (!domQueries[key]) throw new Error(`The ${key} dom query failed`);
}

//  LISTENERS
//    L.1   clicks
//      L.1.list clicks
//  $ul handleClick
$ul.addEventListener('click', (event: Event) => {
  const eventTarget = event.target as HTMLElement;
  //  get closest li ancestor
  const $selectedLi = eventTarget.closest('li') as HTMLLIElement;
  //  loop through data.entries and write matching entry to data.editing
  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId.toString() === $selectedLi.dataset.entryId) {
      data.editing = data.entries[i];
      break;
    }
  }
  if (!data.editing) throw new Error('data.editing should exist');
  //  populate form
  $photoUrl.value = data.editing.photoUrl;
  $title.value = data.editing.title;
  $notes.value = data.editing.notes;
  viewSwap('entry-form');
});

//      L.1.anchor clicks
//  $aEntries handleClick
$aEntries.addEventListener('click', () => {
  viewSwap('entries');
});

//  $aNew handleClick
$aNew.addEventListener('click', () => {
  data.editing = null;
  viewSwap('entry-form');
});

//      L.1.modal clicks
//  $deleteEntry handleClick
$deleteEntry.addEventListener('click', () => {
  $dialog.showModal();
});

//  $cancel handleClick
$cancel.addEventListener('click', () => {
  $dialog.close();
});

//  $confirm handleClick
$confirm.addEventListener('click', () => {
  if (!data.editing) throw new Error('data.editing should exist');
  //  loop through data.entries and delete first object with matching entryId
  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === data.editing.entryId) {
      data.entries.splice(i, 1);
      break;
    }
  }
  //  remove li with matching data-entry-id attribute
  $ul
    .querySelector(`li.entry[data-entry-id="${data.editing.entryId}"]`)
    ?.remove();
  $dialog.close();
  viewSwap('entries');
});

//    L.2   inputs
//      L.2.url inputs
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

//    L.3   loads
//      L.3.DOM loads
//  document handleDOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < data.entries.length; i++) {
    $ul.appendChild(renderEntry(data.entries[i]));
  }
  viewSwap(data.view);
});

//    L.4   submits
//      L.4.form submits
//  $form handleSubmit
$form.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const $formElements: FormElements = $form.elements as FormElements;
  const formSubmission = {
    title: $formElements.title.value,
    photoUrl: $formElements.photoUrl.value,
    notes: $formElements.notes.value,
    //  set entryId to next available
    entryId: data.nextEntryId,
  };
  //  NOT EDITING
  if (!data.editing) {
    //  prepend entries with form
    data.entries.unshift(formSubmission);
    //  prepend list with rendered DOM of form
    $ul.prepend(renderEntry(formSubmission));
    data.nextEntryId++;
    //  EDITING
  } else {
    //  replace entryId with current post entryId
    formSubmission.entryId = data.editing.entryId;
    //  loop through data.entries and replace the object with matching entryId
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === formSubmission.entryId) {
        data.entries[i] = formSubmission;
        break;
      }
    }
    //  select li with matching data-entry-id
    const $liReplace = $ul.querySelector(
      `li.entry[data-entry-id="${formSubmission.entryId}"]`
    ) as HTMLLIElement;
    //  replace corresponding li in list with rendered DOM
    $ul.replaceChild(renderEntry(formSubmission), $liReplace);
  }
  viewSwap('entries');
});

//  FUNCTIONS
//    F.1   unhide HTML element
function showHTML(element: HTMLElement): void {
  element.classList.remove('hidden');
}

//    F.2   hide HTML element
function hideHTML(element: HTMLElement): void {
  element.classList.add('hidden');
}

//    F.3   viewSwap
function viewSwap(string: string): void {
  //  ENTRIES
  if (string === 'entries') {
    if (data.editing) {
      data.editing = null;
    }
    showHTML($divEntries);
    hideHTML($divEntryForm);
    //  ENTRY FORM
  } else if (string === 'entry-form') {
    //  EDITING
    if (data.editing) {
      $formImg.setAttribute('src', $photoUrl.value);
      showHTML($deleteEntry);
      $formHeading.textContent = 'Edit Entry';
      //  NOT EDITING
    } else {
      $form.reset();
      $formImg.setAttribute('src', 'images/placeholder-image-square.jpg');
      hideHTML($deleteEntry);
      $formHeading.textContent = 'New Entry';
    }
    showHTML($divEntryForm);
    hideHTML($divEntries);
  } else
    throw new Error('Provided string does not match either possible option');
  data.view = string;
}

//    F.4   renderEntry
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
