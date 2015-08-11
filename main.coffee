checkAuth = () ->
  Trello.authorize({interactive: false, persist: false, error: () ->
    auth()
  success: () ->
    startSetup()
  })

auth = () ->
  Trello.authorize
    type: "redirect"
    name: "Trello Bookmarklet Maker"
    persist: false
    scope:
      write: true
    expiration: "never"

startSetup = () ->
  #get boards
  $(".js-list-div").hide()
  $(".js-link-div").hide()
  Trello.get("members/me", {boards: "open"}, (data) ->
    span = $(".js-board-selector")
    span.append("<select class=\"js-select\"></select>")
    select = span.find(".js-select")
    for board in data.boards
      select.append("<option value=\"#{board.id}\">#{board.name}</option>")
    button = $(".js-board-select-button")
    button.click( () ->
      id = select.val()
      setupLists(id)
    )
  )

setupLists = (idBoard) ->
  #get lists
  Trello.boards.get(idBoard, {lists: "open"}, (data) ->
    $(".js-list-div").show()
    span = $(".js-list-selector")
    span.empty()
    span.append("<select class=\"js-select\"></select>")
    select = span.find(".js-select")
    for list in data.lists
      select.append("<option value=\"#{list.id}\">#{list.name}</option>")
    button = $(".js-list-select-button")
    button.click( () ->
      idList = select.val()
      pos = $('input[name=pos]:checked').val()
      makeBookmarklet(idBoard, idList, pos)
    )
  )

makeBookmarklet = (idBoard, idList, pos) ->
  token = Trello.token()
  key = Trello.key()
  bookmarklet = "(function(){function b(){if(window.saveTrelloCard)saveTrelloCard(\"#{idList}\",\"#{pos}\",\"#{key}\",\"#{token}\");else setTimeout(b,0)}var a=document.createElement(\"script\");a.setAttribute(\"type\",\"text/javascript\");a.setAttribute(\"charset\",\"UTF-8\");a.setAttribute(\"src\",\"https://raw.github.com/gist/3716000/92c2d4d37aa4cd0638714522cae6d7b07910b93e/saveToCard.js\");document.body.appendChild(a);setTimeout(b,0)})()"
  a = $('.js-show-link')
  a.attr("href", "javascript:#{bookmarklet}")
  a.html("Site to Trello Card")
  $(".js-link-div").show()
    
$(checkAuth)
