// создаем список комментариев
let commentsList = []

// находим элементы формы и кнопку отправки
let nameInput = document.getElementById('name-input')
let textInput = document.getElementById('text-input')
let dateInput = document.getElementById('date-input')
let submitBtn = document.getElementById('submit-btn')

// добавляем обработчик на кнопку отправки
submitBtn.addEventListener('click', addComment)

// функция добавления комментария
function addComment() {
  // получаем значения из полей формы
  let name = nameInput.value.trim()
  let text = textInput.value.trim()
  let date = dateInput.value.trim()
    ? new Date(dateInput.value.trim())
    : new Date()

  // валидация
  if (name === '') {
    nameInput.classList.add('error')
    return
  }

  if (text === '') {
    textInput.classList.add('error')
    return
  }

  // создаем объект комментария
  let comment = {
    name: name,
    text: text,
    date: date,
    likes: 0,
  }

  // добавляем комментарий в список и очищаем форму
  commentsList.push(comment)
  nameInput.value = ''
  nameInput.classList.remove('error')
  textInput.value = ''
  textInput.classList.remove('error')
  dateInput.value = ''

  // обновляем список комментариев на странице
  renderComments()
}

// функция отрисовки списка комментариев на странице
function renderComments() {
  let commentsEl = document.getElementById('comments-list')
  commentsEl.innerHTML = ''

  commentsList.forEach(function (comment, index) {
    let commentEl = document.createElement('div')
    commentEl.classList.add('comment')

    // добавляем информацию о комментарии
    let nameEl = document.createElement('h3')
    nameEl.classList.add('comment-name')
    nameEl.innerText = comment.name
    commentEl.appendChild(nameEl)

    let textEl = document.createElement('p')
    textEl.classList.add('comment-text')
    textEl.innerText = comment.text
    commentEl.appendChild(textEl)

    let dateEl = document.createElement('p')
    dateEl.classList.add('comment-date')
    dateEl.innerText = comment.date
    commentEl.appendChild(dateEl)

    // добавляем кнопку удаления комментария
    let deleteBtn = document.createElement('button')
    deleteBtn.classList.add('delete-btn')
    deleteBtn.innerHTML = '&#128465;' // символ корзины
    deleteBtn.addEventListener('click', function () {
      commentsList.splice(index, 1)
      renderComments()
    })
    commentEl.appendChild(deleteBtn)

    //добавляем кнопку сердечка
    let likeBtn = document.createElement('button')
    likeBtn.classList.add('like-btn')
    likeBtn.innerHTML = '&#10084;'
    likeBtn.addEventListener('click', function () {
      likeBtn.classList.toggle('liked')
      // renderComments()
    })
    commentEl.appendChild(likeBtn)

    let likesEl = document.createElement('span')

    commentEl.appendChild(likesEl)

    commentsEl.appendChild(commentEl)
  })
}

function formatDate(date) {
  let now = new Date()

  if (date.toLocaleDateString() === now.toLocaleDateString()) {
    return 'сегодня, ' + date.toLocaleTimeString()
  } else if (
    date.toLocaleDateString() ===
    new Date(now.setDate(now.getDate() - 1)).toLocaleDateString()
  ) {
    return 'вчера, ' + date.toLocaleTimeString()
  } else {
    return date.toLocaleDateString() + ', ' + date.toLocaleTimeString()
  }
}

// обработчик нажатия Enter на текстовом поле
textInput.addEventListener('keypress', function (event) {
  // проверяем, что нажата клавиша Enter и оба поля не содержат ошибок
  if (
    event.keyCode === 13 &&
    nameInput.value.trim() !== '' &&
    textInput.value.trim() !== '' &&
    !nameInput.classList.contains('error') &&
    !textInput.classList.contains('error')
  ) {
    addComment()
  } else if (
    event.keyCode === 13 &&
    nameInput.value.trim() === '' &&
    textInput.value.trim() !== '' &&
    !nameInput.classList.contains('error') &&
    !textInput.classList.contains('error')
  ) {
    alert('Ввод имени обязателен')
  }
})

nameInput.addEventListener('keypress', function (event) {
  // проверяем, что нажата клавиша Enter и оба поля не содержат ошибок
  if (
    event.keyCode === 13 &&
    nameInput.value.trim() !== '' &&
    textInput.value.trim() !== '' &&
    !nameInput.classList.contains('error') &&
    !textInput.classList.contains('error')
  ) {
    addComment()
  } else if (
    event.keyCode === 13 &&
    nameInput.value.trim() !== '' &&
    textInput.value.trim() === '' &&
    !nameInput.classList.contains('error') &&
    !textInput.classList.contains('error')
  ) {
    alert('Ввод текста комментария обязателен')
  }
})

// обработчик изменения содержимого поля имени
nameInput.addEventListener('input', function () {
  // если поле имени содержало ошибку, удаляем ее
  if (nameInput.classList.contains('error')) {
    nameInput.classList.remove('error')
  }
  // проверяем, что оба поля не содержат ошибок
  if (nameInput.value.trim() !== '' && textInput.value.trim() !== '') {
    // удаляем атрибут disabled с кнопки отправки
    submitBtn.removeAttribute('disabled')
  } else {
    // добавляем атрибут disabled к кнопке отправки
    submitBtn.setAttribute('disabled', 'disabled')
  }
})

nameInput.addEventListener('keypress', function (event) {
  // проверяем, что нажата клавиша Enter и оба поля не содержат ошибок
  if (
    event.keyCode === 13 &&
    nameInput.value.trim() !== '' &&
    textInput.value.trim() !== '' &&
    !nameInput.classList.contains('error') &&
    !textInput.classList.contains('error')
  ) {
    addComment()
  }
})

// обработчик изменения содержимого поля текста
textInput.addEventListener('input', function () {
  // если поле текста содержало ошибку, удаляем ее
  if (textInput.classList.contains('error')) {
    textInput.classList.remove('error')
  }
  // проверяем, что оба поля не содержат ошибок
  if (nameInput.value.trim() !== '' && textInput.value.trim() !== '') {
    // удаляем атрибут disabled с кнопки отправки
    submitBtn.removeAttribute('disabled')
  } else {
    // добавляем атрибут disabled к кнопке отправки
    submitBtn.setAttribute('disabled', 'disabled')
  }
})

renderComments()
