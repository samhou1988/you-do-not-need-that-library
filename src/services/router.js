const router = {
  init: () => {
    // init
    document.querySelectorAll("a.navlink").forEach((link) => {
      link.on("click", (e) => {
        e.preventDefault();
        const route = link.getAttribute("href");
        router.go(route);
      });
    });

    router.go(location.pathname, false);
  },
  go: (route, addToHistory = true) => {
    if (addToHistory) {
      history.pushState({ route }, "", route);
    }
    let pageElement = null;
    switch (route) {
      case "/":
        pageElement = document.createElement("menu-page");
        break;
      case "/order":
        pageElement = document.createElement("order-page");
        break;
      default:
        if (route.startsWith("/product-")) {
          pageElement = document.createElement("details-page");
          pageElement.dataset.productId = route.substring(route.lastIndexOf("-")+1);
        }
        break;
    }

    if (pageElement) {
      // get current page element
      let currentPage = document.querySelector("main").firstElementChild;
      if (currentPage) {
        let fadeOut = currentPage.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: 200,
        });
        fadeOut.addEventListener("finish", () => {
          currentPage.remove();
          document.querySelector("main").appendChild(pageElement);
          let fadeIn = pageElement.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 200,
          });
        });
      } else {
        document.querySelector("main").appendChild(pageElement);
      }
    }

    window.screenX = 0;
  },
};

window.addEventListener("popstate", (e) => {
  router.go(event.state.route, false);
});

export default router;
