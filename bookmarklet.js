(
  function()
  {
    var e=document.createElement('script');
    e.setAttribute('type','text/javascript');
    e.setAttribute('charset','UTF-8');
    e.setAttribute('src','https://raw.github.com/gist/3716000/92c2d4d37aa4cd0638714522cae6d7b07910b93e/saveToCard.js');
    document.body.appendChild(e);
    function checkSave() {
      if(window.saveTrelloCard)
        saveTrelloCard("#{idList}", "#{key}", "#{token}");
      else
        setTimeout(checkSave, 0);
    }
    setTimeout(checkSave,0);
  }
)()
