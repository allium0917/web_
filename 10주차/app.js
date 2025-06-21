// 상품 데이터
let products = [
  { title: '수박바', price: 60000, count: 3 },
  { title: '와', price: 120000, count: 5 },
  { title: '요맘때 딸기', price: 30000, count: 10 },
  { title: '거북알', price: 5000, count: 2 }
];

// HTML에 상품을 렌더링하는 함수
function renderProducts(data) {
  const list = document.getElementById('product-list');
  list.innerHTML = ''; // 기존 상품 제거

  data.forEach(item => {
    const card = `
      <div class="product-card">
        <h5>${item.title}</h5>
        <p>가격 : ${item.price}원</p>
        <p>재고 : ${item.count}개</p>
      </div>
    `;
    list.insertAdjacentHTML('beforeend', card);
  });
}

// 삭제 버튼
document.getElementById('del-btn').addEventListener('click', () => {
  const keyword = document.getElementById('search-input').value.trim();

  if (!keyword) {
    alert('삭제할 상품명을 입력하세요.');
    return;
  }

  products = products.filter(item => !item.title.includes(keyword));
  renderProducts(products);
  document.getElementById('search-input').value = '';
});

// 검색 버튼
document.getElementById('search-btn').addEventListener('click', function () {
  const keyword = document.getElementById('search-input').value.trim();
  const filtered = products.filter(item => item.title.includes(keyword));
  renderProducts(filtered);
});

// 가격순 정렬
let priceSortOrder = 'desc';

document.getElementById('sort-price').addEventListener('click', function () {
  if (priceSortOrder === 'desc') {
    products.sort((a, b) => a.price - b.price);
    priceSortOrder = 'asc';
  } else {
    products.sort((a, b) => b.price - a.price);
    priceSortOrder = 'desc';
  }
  renderProducts(products);
});

// 가나다순 정렬
let nameSortOrder = 'asc';

document.getElementById('sort-name').addEventListener('click', function () {
  if (nameSortOrder === 'asc') {
    products.sort((a, b) => b.title.localeCompare(a.title, 'ko'));
    nameSortOrder = 'desc';
  } else {
    products.sort((a, b) => a.title.localeCompare(b.title, 'ko'));
    nameSortOrder = 'asc';
  }
  renderProducts(products);
});

// 상품 추가 기능
document.getElementById('add-product').addEventListener('click', function () {
  const title = document.getElementById('new-title').value.trim();
  const price = parseInt(document.getElementById('new-price').value);
  const isDuplicate = products.some(item => item.title === title);

  if (!title || isNaN(price)) {
    alert('상품명과 가격을 올바르게 입력하세요.');
    return;
  }
  if (isDuplicate) {
    alert('이미 존재하는 상품입니다.');
    return;
  }

  products.push({ title, price });
  renderProducts(products);

  document.getElementById('new-title').value = '';
  document.getElementById('new-price').value = '';
});

// 초기 렌더링
renderProducts(products);
