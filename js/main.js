'use strict';
//  DOM queries
const $photoUrl = document.querySelector('#photoUrl');
const $formImg = document.querySelector('#formImg');
const $form = document.querySelector('form');
//  error coverage
if (!$photoUrl || !$formImg || !$form)
  throw new Error('One of the dom queries failed');
//  $photoUrl handleInput
$photoUrl.addEventListener('input', (event) => {
  const eventTarget = event.target;
  if (eventTarget.checkValidity()) {
    $formImg.setAttribute('src', eventTarget.value);
    $formImg.setAttribute('alt', 'Your image');
  } else {
    $formImg.setAttribute('src', 'images/placeholder-image-square.jpg');
    $formImg.setAttribute('alt', 'Placeholder image');
  }
});
//  $form handleSubmit
$form.addEventListener('submit', (event) => {
  event.preventDefault();
  const $formElements = $form.elements;
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
function renderEntry(entry) {
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
console.log(renderEntry(data.entries[1]));
const $ul = document.querySelector('ul');
if (!$ul) throw new Error('The $ul query failed');
let i = 0;
while (i < data.entries.length) {
  $ul.appendChild(renderEntry(data.entries[i]));
  i++;
}
