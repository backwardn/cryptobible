require(['gitbook'], function(gitbook) {

  const selector = ".gb-markdown h2, .gb-markdown h3, .gb-markdown h4";

  anchors.options =
      {
        placement: 'left'
      }

      gitbook.events.bind('page.change', function() {

        var addNavItem = function(ul, href, text) {
          var listItem = document.createElement('li'),
              anchorItem = document.createElement('a'),
              textNode = document.createTextNode(text);
          anchorItem.href = href;
          ul.appendChild(listItem);
          listItem.appendChild(anchorItem);
          anchorItem.appendChild(textNode);
        };

        var anchorLevel = function(nodeName) {
          return parseInt(nodeName.charAt(1) - 1);
        };

        var navTreeNode =
            function(current, moveLevels) {
              var e = current;
              if (moveLevels > 0) {
                var ul;
                for (var i = 0; i < moveLevels; i++) {
                  ul = document.createElement('ul');
                  e.appendChild(ul);
                  e = ul;
                }
              } else {
                for (var i = 0; i > moveLevels; i--) {
                  e = e.parentElement;
                }
              }
              return e;
            }

            anchors.removeAll();
        anchors.add(selector);

        if (anchors.elements.length > 1) {
          var text, href, currentLevel;
          var prevLevel = 0;
          var nav = document.createElement('nav');
          nav.className = 'page-toc';
          var container = nav;
          for (var i = 0; i < anchors.elements.length; i++) {
            text = anchors.elements[i].textContent;
            href = anchors.elements[i]
                       .querySelector('.anchorjs-link')
                       .getAttribute('href');
            currentLevel = anchorLevel(anchors.elements[i].nodeName);
            container = navTreeNode(container, currentLevel - prevLevel);
            addNavItem(container, href, text);
            prevLevel = currentLevel;
          }

          var first = anchors.elements[0];
          first.parentNode.insertBefore(nav, first);
        }

      })

});
