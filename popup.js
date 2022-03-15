// // Initialize butotn with users's prefered color
let changeColor = document.getElementById("changeColor");

// // When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPage,
  });
});

// // The body of this function will be execuetd as a content script inside the
// // current page
function setPage() {
  //创建页面函数
  function createPage () {
    // const page = $('<div id="cj_move_page"><div>')
    const page = document.createElement('div')
    page.id = 'cj_move_page'
    const h3 = document.createElement('h3')
    h3.innerHTML = `
      <h4>An overview of the</h4>
      <ul>
        <li>
          <span>Quantity</span>
          <div>128</div>
        </li>
        <li>
          <span>Highest</span>
          <div>$29.99</div>
        </li>
        <li>
          <span>Minimum</span>
          <div>$16.99</div>
        </li>
      </ul>
      <h4 class="details">Details</h4>
      <h5>Highest price on this page</h5>
      <div class="goods">
        <img src="https://cdn.shopify.com/s/files/1/0293/9277/products/02-25-22Studio6_RT_13-32-17_40_GEMMA101_Yellow_0938_EH_360x.jpg?v=1646351456">
        <div class="info">
          <div class="title">Beach Butterfly 2 Piece Bikini - Yellow/combo</div>
          <div class="price">
            <span class="title">Price(USD)</span>
            <span>$29.99</span>
          </div>
        </div>
      </div>
      <h5>Lowest price on this page</h5>
      <div class="goods">
        <img src="https://cdn.shopify.com/s/files/1/0293/9277/products/03-01-22Studio6_RT_10-37-43_27_ANJOLIE6_Pink_1102_KS_360x.jpg?v=1646513096">
        <div class="info">
          <div class="title">Weekend In Palm Springs Wedges - Pink/combo</div>
          <div class="price">
            <span class="title">Price(USD)</span>
            <span>$16.99</span>
          </div>
        </div>
      </div>
      <div id="close">X</div>
    `
    h3.id = 'cj_move_h3'
    page.append(h3)
    document.body.append(page);
    const close = document.querySelector('#close')

    close.addEventListener("click", () => {
      page.style.display = 'none'
      document.body.style.overflow = 'auto'
    });
  }
  chrome.storage.sync.get("browserAction", ({ browserAction }) => {
    createPage()
    // console.log('chrome', chrome.browserAction)
    document.body.style.overflow = 'hidden'
  })

  // chrome.storage.local.get(['ajaxInterceptor_switchOn', 'ajaxInterceptor_rules'], (result) => {
  //   console.log('result', result)
  //   // if (result.hasOwnProperty('ajaxInterceptor_switchOn')) {
  //   //   if (result.ajaxInterceptor_switchOn) {
  //   //     chrome.browserAction.setIcon({path: "/images/16.png"});
  //   //   } else {
  //   //     chrome.browserAction.setIcon({path: "/images/16_gray.png"});
  //   //   }
  //   // }
  // })
}


