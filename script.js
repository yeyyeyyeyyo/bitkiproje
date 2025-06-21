function toggleFAQ(item) {
  const isActive = item.classList.contains('active');
  document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('active'));
  if (!isActive) item.classList.add('active');
}

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('plant-form');
  const plantList = document.getElementById('plant-list');
  const noPlantsMsg = document.getElementById('no-plants-message');
  const openFormBtns = document.querySelectorAll('.add-plant-btn, .hero-btn');

  // ✅ Formu açan butonlar
  openFormBtns.forEach(btn =>
    btn.addEventListener('click', () => {
      form.style.display = 'block';
    })
  );

  // ✅ Formu kapat
  window.closeForm = () => {
    form.style.display = 'none';
  };

  // ✅ Bitki ekleme işlemi
  document.getElementById('addPlantForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const nameInput = document.getElementById('plantName');
    const imageInput = document.getElementById('plantImage');
  
    const name = nameInput ? nameInput.value.trim() : '';
    const image = imageInput ? imageInput.value.trim() : '';
  
    if (name === '') {
      alert("Lütfen bitki adını girin.");
      return;
    }
    
    const plantData = {
      name,
      image,
      sulama: 'Son sulama 0 gün önce',
      gubre: 'Son gübreleme 0 gün önce'
    };
  
    const existing = JSON.parse(localStorage.getItem('plants') || '[]');
    existing.push(plantData);
    localStorage.setItem('plants', JSON.stringify(existing));
  
    document.getElementById('addPlantForm').reset();
    document.getElementById('plant-form').style.display = 'none';
    showPlants();
  });
  
  // ✅ Bitkileri göster
  function showPlants() {
    const saved = JSON.parse(localStorage.getItem('plants') || '[]');

    // sadece bitki kartlarını temizle
    plantList.querySelectorAll('.plant-card').forEach(card => card.remove());

    if (!saved || saved.length === 0) {
      if (noPlantsMsg) noPlantsMsg.style.display = 'block';
    } else {
      if (noPlantsMsg) noPlantsMsg.style.display = 'none';
      saved.forEach(addPlantCard);
    }
  }

  // ✅ Bitki kartlarındaki butonlar
  plantList.addEventListener('click', function (e) {
    const card = e.target.closest('.plant-card');
    if (!card) return;

    const name = card.querySelector('.plant-name').textContent;

    if (e.target.classList.contains('btn-sil')) {
      let plants = JSON.parse(localStorage.getItem('plants') || '[]');
      plants = plants.filter(p => p.name !== name);
      localStorage.setItem('plants', JSON.stringify(plants));
      card.remove();
      if (document.querySelectorAll('.plant-card').length === 0) {
        if (noPlantsMsg) noPlantsMsg.style.display = 'block';
      }
    }

    if (e.target.classList.contains('btn-sula')) {
      const name = card.querySelector('.plant-name').textContent;
      let plants = JSON.parse(localStorage.getItem('plants') || '[]');
      const index = plants.findIndex(p => p.name === name);
      if (index !== -1) {
        plants[index].sulama = 'Son sulama şimdi';
        localStorage.setItem('plants', JSON.stringify(plants));
      }
      card.querySelectorAll('.plant-status')[0].textContent = 'Son sulama şimdi';
    }
    
    if (e.target.classList.contains('btn-gubre')) {
      const name = card.querySelector('.plant-name').textContent;
      let plants = JSON.parse(localStorage.getItem('plants') || '[]');
      const index = plants.findIndex(p => p.name === name);
      if (index !== -1) {
        plants[index].gubre = 'Son gübreleme şimdi';
        localStorage.setItem('plants', JSON.stringify(plants));
      }
      card.querySelectorAll('.plant-status')[1].textContent = 'Son gübreleme şimdi';
    }    
  });

  // ✅ Sayfa ilk yüklenince bitkileri göster
  showPlants();
});

// ✅ Kart oluşturan fonksiyon
function addPlantCard(data) {
  const card = document.createElement('div');
  card.className = 'plant-card';

  const imageDiv = document.createElement('div');
  imageDiv.className = 'plant-image';
  if (data.image) {
    imageDiv.style.backgroundImage = `url(${data.image})`;
    imageDiv.style.backgroundSize = 'cover';
  }

  const nameDiv = document.createElement('div');
  nameDiv.className = 'plant-name';
  nameDiv.textContent = data.name;

  const sulama = document.createElement('div');
  sulama.className = 'plant-status';
  sulama.textContent = data.sulama;

  const gubre = document.createElement('div');
  gubre.className = 'plant-status';
  gubre.textContent = data.gubre;

  const btns = document.createElement('div');
  btns.className = 'plant-buttons';
  btns.innerHTML = `
    <button class="btn btn-sula">Sula</button>
    <button class="btn btn-sil">Sil</button>
    <button class="btn btn-gubre">Güb.</button>
  `;

  card.append(imageDiv, nameDiv, sulama, gubre, btns);
  document.getElementById('plant-list').appendChild(card);
}
function toggleMobileMenu() {
  const nav = document.querySelector('.nav-links');
  nav.classList.toggle('mobile-visible');
}
// Menü dışına tıklandığında menüyü kapat
document.addEventListener('click', function(e) {
  const nav = document.querySelector('.nav-links');
  const hamburger = document.querySelector('.hamburger');
  
  if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
    nav.classList.remove('mobile-visible');
  }
});