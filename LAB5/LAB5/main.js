let category = "";
let search_term = "";
let last_category = null;
let last_search_term = null;

let product_container = document.getElementById("product_container");

let start = 0;
let counter = 4;
let finalGroup = []; // 출력할 상품들

document.getElementById("my_form").addEventListener("submit", async (e) => {
  e.preventDefault();
  category = document.getElementById("category").value;
  search_term = document.getElementById("search").value;

  let response = await fetch("product.json");
  let result = await response.json();

  finalGroup = [];

  // 카테고리가 all이라면
  if (category === "all") {
    // search term을 입력하지 않았다면
    if (search_term === "") {
      finalGroup = result;
      // search term을 입력하였다면
    } else {
      result.forEach((item) => {
        if (item.name.includes(`${search_term}`)) {
          finalGroup.push(item);
        }
      });
    }
    // 다른 카테고리라면
  } else {
    let temp = [];
    // 일단 temp에 카테고리에 맞는 상품을 다 담아보고
    result.forEach((item) => {
      if (item.type === category) {
        temp.push(item);
      }
    });

    if (search_term === "") {
      finalGroup = temp;
    }
    // 추가적으로 걸러낸다.
    else {
      temp.forEach((item) => {
        if (item.name.includes(`${search_term}`)) {
          finalGroup.push(item);
        }
      });
    }
  }

  while (product_container.firstElementChild) {
    product_container.firstElementChild.remove();
  }

  start = 0;
  display_products(finalGroup); // 렌더링 하고
  last_category = category; // 가장최근에 검색했던 조건.
  last_search_term = search_term; // 가장최근에 검색했던 조건.
});

document.addEventListener("DOMContentLoaded", async () => {
  let response = await fetch("product.json");
  let result = await response.json();
  finalGroup = [...result];
  display_products(finalGroup);
});

window.onscroll = () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    console.log("infinte scroll working");
    display_products(finalGroup);
  }
};

function display_products(finalGroup) {
  for (let i = start; i < start + 6; ++i) {
    if (i >= finalGroup.length) {
      break;
    }
    let div = document.createElement("div");
    let elem = document.createElement("img");
    let info = document.createElement("p");

    div.className = "product";
    elem.className = "product_img";
    elem.src = `images/${finalGroup[i].image}`;
    info.innerHTML = `제품: ${finalGroup[i].name}<br>가격: ${finalGroup[i].price}`;

    div.append(elem);
    div.append(info);
    product_container.append(div);

    div.addEventListener("click", () => {
      div.lastElementChild.style.display = "inline";
    });
  }

  start += 6;
}
