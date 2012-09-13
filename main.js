// Generated by CoffeeScript 1.3.3
(function() {
  var auth, checkAuth, makeBookmarklet, setupLists, startSetup;

  checkAuth = function() {
    return Trello.authorize({
      interactive: false,
      persist: false,
      error: function() {
        return auth();
      },
      success: function() {
        return startSetup();
      }
    });
  };

  auth = function() {
    return Trello.authorize({
      type: "redirect",
      name: "Trello Bookmarklet Maker",
      persist: false,
      scope: {
        write: true
      },
      expiration: "never"
    });
  };

  startSetup = function() {
    $(".js-list-div").hide();
    $(".js-link-div").hide();
    return Trello.get("members/me", {
      boards: "open"
    }, function(data) {
      var board, button, select, span, _i, _len, _ref;
      span = $(".js-board-selector");
      span.append("<select class=\"js-select\"></select>");
      select = span.find(".js-select");
      _ref = data.boards;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        board = _ref[_i];
        select.append("<option value=\"" + board.id + "\">" + board.name + "</option>");
      }
      button = $(".js-board-select-button");
      return button.click(function() {
        var id;
        id = select.val();
        return setupLists(id);
      });
    });
  };

  setupLists = function(idBoard) {
    return Trello.boards.get(idBoard, {
      lists: "open"
    }, function(data) {
      var button, list, select, span, _i, _len, _ref;
      $(".js-list-div").show();
      span = $(".js-list-selector");
      span.empty();
      span.append("<select class=\"js-select\"></select>");
      select = span.find(".js-select");
      _ref = data.lists;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        list = _ref[_i];
        select.append("<option value=\"" + list.id + "\">" + list.name + "</option>");
      }
      button = $(".js-list-select-button");
      return button.click(function() {
        var idList;
        idList = select.val();
        return makeBookmarklet(idBoard, idList);
      });
    });
  };

  makeBookmarklet = function(idBoard, idList) {
    var a, bookmarklet, key, token;
    token = Trello.token();
    key = Trello.key();
    bookmarklet = "(function(){function b(){if(window.saveTrelloCard)saveTrelloCard(\"" + idList + "\",\"" + key + "\",\"" + token + "\");else setTimeout(b,0)}var a=document.createElement(\"script\");a.setAttribute(\"type\",\"text/javascript\");a.setAttribute(\"charset\",\"UTF-8\");a.setAttribute(\"src\",\"https://raw.github.com/gist/3716000/92c2d4d37aa4cd0638714522cae6d7b07910b93e/saveToCard.js\");document.body.appendChild(a);setTimeout(b,0)})()";
    a = $('.js-show-link');
    a.attr("href", "javascript:" + bookmarklet);
    a.html("Site to Trello Card");
    return $(".js-link-div").show();
  };

  $(checkAuth);

}).call(this);
