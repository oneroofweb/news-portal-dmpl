// ==========================================================================
// Navbar Top Fixed JS
// ==========================================================================

document.addEventListener("DOMContentLoaded", function () {
    const topbar = document.querySelector('.topbar-custom'); 
    const navbar = document.getElementById('primary-nav');   
    
    if (topbar && navbar) {
        window.addEventListener('scroll', function () {
            
            if (window.scrollY > topbar.offsetHeight) {
                navbar.classList.add('is-sticky');
                
                document.body.style.paddingTop = navbar.offsetHeight + 'px';
            } else {
                
                navbar.classList.remove('is-sticky');
                document.body.style.paddingTop = '0';
            }
        });
    }
});

  /*==========================================================================
       Search Bar Active Bar JS
    ==========================================================================*/ 
    document.addEventListener("DOMContentLoaded", function () {
    // Search Modal Auto-focus
    const searchModal = document.getElementById('searchModal');
    if (searchModal) {
        const searchInput = document.getElementById('modalSearchInput');
        searchModal.addEventListener('shown.bs.modal', function () {
            searchInput.focus(); 
        });
    }
});

// ==========================================
// CITY SELECTION MODAL LOGIC
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
    // Live Search Filter Logic
    const citySearchInput = document.getElementById('citySearchInput');
    
    if(citySearchInput) {
        citySearchInput.addEventListener('input', function() {
            let input = this.value.toLowerCase().trim();
            let cityItems = document.querySelectorAll('.city-item');
            let popularSection = document.getElementById('popularSection');
            let noCityFound = document.getElementById('noCityFound');
            let visibleCount = 0;

            if(input.length > 0) {
                popularSection.style.display = 'none';
            } else {
                popularSection.style.display = 'block';
            }

            cityItems.forEach(item => {
                let btn = item.querySelector('button'); 
                if (btn) {
                    let cityNameHi = btn.innerText.toLowerCase();
                    let cityNameEn = btn.getAttribute('data-en') ? btn.getAttribute('data-en').toLowerCase() : ''; // इंग्लिश नाम

                    if (cityNameHi.includes(input) || cityNameEn.includes(input)) {
                        item.style.display = "block";
                        visibleCount++;
                    } else {
                        item.style.display = "none";
                    }
                }
            });

            if(visibleCount === 0 && input.length > 0) {
                noCityFound.style.display = 'block';
            } else {
                noCityFound.style.display = 'none';
            }
        });
    }

    const cityModal = document.getElementById('cityModal');
    if (cityModal) {
        cityModal.addEventListener('shown.bs.modal', function () {
            document.getElementById('citySearchInput').focus();
        });
    }
});

function selectCity(cityName) {
    // 1. LocalStorage में सेव करें
    localStorage.setItem('selectedCity', cityName);
    
    let citySpan = document.getElementById('user-current-city');
    if(citySpan) {
        citySpan.innerText = cityName;
        citySpan.classList.add('text-danger', 'fw-bold');
    }
    
    const cityModalEl = document.getElementById('cityModal');
    const modalInstance = bootstrap.Modal.getInstance(cityModalEl);
    if(modalInstance) {
        modalInstance.hide();
    }
    
    document.getElementById('citySearchInput').value = '';
    document.getElementById('citySearchInput').dispatchEvent(new Event('input'));
}


// ======================= CATEGORY PAGE - JS =======================

// Load More Button Fake Loader (For UI Testing)
const loadMoreBtn = document.getElementById('loadMoreBtn');
if(loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function() {
        let originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> लोड हो रहा है...';
        this.classList.add('disabled');
        
        // 1.5 Second baad wapas normal karna
        setTimeout(() => {
            this.innerHTML = originalText;
            this.classList.remove('disabled');
        }, 1500);
    });
}


