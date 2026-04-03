        // Sidebar Toggle Logic
document.addEventListener("DOMContentLoaded", function() {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggleSidebar');
    const closeBtn = document.getElementById('closeSidebar');

    if(toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', function() {
            if (window.innerWidth < 768) {
                sidebar.classList.toggle('active'); 
            } else {
                sidebar.classList.toggle('collapsed');
            }
        });
    }

    if(closeBtn && sidebar) {
        closeBtn.addEventListener('click', function() {
            sidebar.classList.remove('active');
        });
    }

    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            sidebar.classList.remove('active');
        }
    });
});
        


    // ==========================================
    // 1. PERMALINK EDIT LOGIC
    // ==========================================

document.addEventListener("DOMContentLoaded", function() {

    const editBtn = document.getElementById('edit-permalink-btn');
    const saveBtn = document.getElementById('save-permalink-btn');
    const cancelBtn = document.getElementById('cancel-permalink-btn');
    
    const permalinkText = document.getElementById('permalink-text');
    const permalinkInput = document.getElementById('permalink-input');
    const editDiv = document.getElementById('permalink-edit-div');

    let originalSlug = permalinkText.innerText;

    // Edit par click karne par
    if(editBtn) {
        editBtn.addEventListener('click', function() {
            permalinkText.classList.add('d-none');
            editBtn.classList.add('d-none');
            editDiv.classList.remove('d-none');
            editDiv.classList.add('d-flex');
            permalinkInput.focus();
        });
    }

    // OK (Save) par click karne par
    if(saveBtn) {
        saveBtn.addEventListener('click', function() {
            // Text ko URL friendly banana (Spaces ko dash '-' mein badalna)
            let newSlug = permalinkInput.value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            
            permalinkInput.value = newSlug;
            permalinkText.innerText = newSlug;
            originalSlug = newSlug;

            editDiv.classList.add('d-none');
            editDiv.classList.remove('d-flex');
            permalinkText.classList.remove('d-none');
            editBtn.classList.remove('d-none');
        });
    }

    // Cancel par click karne par
    if(cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            permalinkInput.value = originalSlug; // Wapas purana text daal do
            editDiv.classList.add('d-none');
            editDiv.classList.remove('d-flex');
            permalinkText.classList.remove('d-none');
            editBtn.classList.remove('d-none');
        });
    }


    // ==========================================
    // 2. FEATURED IMAGE UPLOAD PREVIEW LOGIC
    // ==========================================
    const imageInput = document.getElementById('featured-image-input');
    const imagePreview = document.getElementById('image-preview');
    const placeholder = document.getElementById('upload-placeholder');
    const removeBtn = document.getElementById('remove-image-btn');

    if(imageInput) {
        imageInput.addEventListener('change', function(event) {
            const file = event.target.files[0];
            
            if (file) {
                // FileReader API se photo ko read karna
                const reader = new FileReader();
                reader.onload = function(e) {
                    imagePreview.src = e.target.result; // Photo ka data image tag mein set karna
                    imagePreview.classList.remove('d-none');
                    placeholder.classList.add('d-none');
                    removeBtn.classList.remove('d-none');
                }
                reader.readAsDataURL(file);
            }
        });
    }

    // Photo Hatane (Remove) ka logic
    if(removeBtn) {
        removeBtn.addEventListener('click', function() {
            imageInput.value = ''; // Input clear karein
            imagePreview.src = ''; // Image src clear karein
            imagePreview.classList.add('d-none');
            placeholder.classList.remove('d-none');
            removeBtn.classList.add('d-none');
        });
    }

});

    // ==========================================
    //     All Post - Category Filter
    // ==========================================
    


document.addEventListener("DOMContentLoaded", function() {

    // Check karein ki hum 'All Posts' page par hain ya nahi
    const cardsContainer = document.getElementById('cardsContainer');
    if(!cardsContainer) return;

    // 1. DUMMY DATA (Backend se yahi data aayega baad mein)
    const newsData = [
        { id: 1, title: "Shahrukh Khan's 'Jawan 2' Officially Announced", category: "मनोरंजन (Entertainment)", views: "12.5k", status: "Published", date: "03 Apr 2026", img: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=400" },
        { id: 2, title: "Stock Market Crash: Sensex drops 1000 points", category: "बिज़नेस (Business)", views: "8.2k", status: "Draft", date: "02 Apr 2026", img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400" },
        { id: 3, title: "IPL 2026: Dhoni hits 3 consecutive sixes", category: "खेल (Sports)", views: "15k", status: "Published", date: "01 Apr 2026", img: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400" },
        { id: 4, title: "Elections 2026: New voting rules announced", category: "राजनीति (Politics)", views: "5k", status: "Published", date: "30 Mar 2026", img: "https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=400" },
        { id: 5, title: "Alia Bhatt's stunning look at Met Gala", category: "फैशन (Fashion)", views: "9k", status: "Published", date: "28 Mar 2026", img: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400" }
    ];

    // 2. SETTINGS
    const rowsPerPage = 3; // Ek page par kitne cards dikhane hain?
    let currentPage = 1;
    let filteredData = [...newsData];

    const paginationContainer = document.getElementById('paginationContainer');
    const pageInfo = document.getElementById('pageInfo');
    const searchBox = document.getElementById('customSearchBox');

    // 3. RENDER CARDS
    function renderCards() {
        cardsContainer.innerHTML = ''; 
        
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const paginatedData = filteredData.slice(start, end);

        if (paginatedData.length === 0) {
            cardsContainer.innerHTML = `<div class="col-12 text-center text-muted py-5"><i class="fas fa-search fa-2x mb-3 opacity-50"></i><br>कोई रिजल्ट नहीं मिला!</div>`;
            return;
        }

        paginatedData.forEach(post => {
            // Status ke hisaab se color
            const statusBadge = post.status === 'Published' ? 'bg-success-light text-success border-success' : 'bg-warning-light text-warning border-warning';
            
            const cardHTML = `
                <div class="col-md-6 col-xl-4">
                    <div class="card border-0 shadow-sm h-100 overflow-hidden news-card-hover bg-white rounded-3">
                        <div class="position-relative">
                            <img src="${post.img}" class="card-img-top object-fit-cover" style="height: 180px;" alt="Post">
                            <span class="badge ${statusBadge} border border-opacity-25 position-absolute top-0 end-0 m-2 px-2 py-1 shadow-sm">${post.status}</span>
                        </div>
                        <div class="card-body p-4">
                            <span class="badge bg-light text-dark border small mb-2 px-2">${post.category}</span>
                            <h6 class="fw-bold text-dark line-clamp-2 mb-3" style="font-size: 1.05rem; line-height: 1.4;">${post.title}</h6>
                            <div class="d-flex justify-content-between text-muted small fw-medium">
                                <span><i class="fas fa-eye me-1 text-primary"></i> ${post.views}</span>
                                <span><i class="far fa-calendar-alt me-1 text-danger"></i> ${post.date}</span>
                            </div>
                        </div>
                        <div class="card-footer bg-white border-top border-light p-3 d-flex gap-2">
                            <button class="btn btn-light btn-sm flex-grow-1 text-primary fw-medium hover-primary border"><i class="fas fa-edit me-1"></i> Edit</button>
                            <button class="btn btn-light btn-sm flex-grow-1 text-danger fw-medium hover-danger border"><i class="fas fa-trash me-1"></i> Trash</button>
                        </div>
                    </div>
                </div>
            `;
            cardsContainer.innerHTML += cardHTML;
        });

        updatePageInfo();
    }

    // 4. RENDER PAGINATION (Buttons)
    function renderPagination() {
        paginationContainer.innerHTML = '';
        const totalPages = Math.ceil(filteredData.length / rowsPerPage);

        if (totalPages <= 1) return; 

        for (let i = 1; i <= totalPages; i++) {
            const btnClass = i === currentPage ? 'btn-danger text-white border-danger shadow-sm' : 'btn-light text-dark border';
            const btnHTML = `<button class="btn btn-sm ${btnClass} px-3 fw-bold rounded-2 mx-1" onclick="changePage(${i})">${i}</button>`;
            paginationContainer.innerHTML += btnHTML;
        }
    }

    // Window object par function taki HTML onclick usko dhoondh sake
    window.changePage = function(pageNumber) {
        currentPage = pageNumber;
        renderCards();
        renderPagination();
    };

    function updatePageInfo() {
        const total = filteredData.length;
        const startNum = total > 0 ? (currentPage - 1) * rowsPerPage + 1 : 0;
        const endNum = Math.min(currentPage * rowsPerPage, total);
        pageInfo.innerHTML = `Showing <strong>${startNum} to ${endNum}</strong> of <strong>${total}</strong> entries`;
    }

    // 5. SEARCH LOGIC (Bina page reload kiye turant search)
    searchBox.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        
        filteredData = newsData.filter(post => 
            post.title.toLowerCase().includes(searchTerm) || 
            post.category.toLowerCase().includes(searchTerm)
        );
        
        currentPage = 1; 
        renderCards();
        renderPagination();
    });

    // 6. START THE ENGINE
    renderCards();
    renderPagination();

});