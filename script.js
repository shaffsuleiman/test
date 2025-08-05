// Enhanced Demo Section Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', function() {
      mobileMenuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking on links
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (navMenu.classList.contains('active') && 
          !navMenu.contains(event.target) && 
          !mobileMenuToggle.contains(event.target)) {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    });
  }
  
  // Side-by-side three images showcase
  const originalSet = document.getElementById('originalSet');
  const processedSet = document.getElementById('processedSet');
  let showingOriginal = true;
  
  function toggleImageSets() {
    if (showingOriginal) {
      // Switch to processed images
      originalSet.classList.remove('active');
      processedSet.classList.add('active');
      showingOriginal = false;
    } else {
      // Switch back to original images
      processedSet.classList.remove('active');
      originalSet.classList.add('active');
      showingOriginal = true;
    }
  }
  
  // Start cycling if we have the image sets
  if (originalSet && processedSet) {
    // Toggle every 3 seconds
    setInterval(toggleImageSets, 3000);
  }
  
  const imageUpload = document.getElementById('imageUpload');
  const preview = document.getElementById('preview');
  const uploadZone = document.getElementById('uploadZone');
  const uploadText = document.querySelector('.upload-text');
  const uploadSubtext = document.querySelector('.upload-subtext');

  // Image Transformation Demo
  const transformBtn = document.getElementById('transformBtn');
  const btnText = document.getElementById('btnText');
  const demoDescription = document.getElementById('demoDescription');
  const imageSet1 = document.getElementById('imageSet1');
  const imageSet2 = document.getElementById('imageSet2');
  
  let isShowingOriginal = true;

  // Image transformation functionality
  if (transformBtn) {
    transformBtn.addEventListener('click', function() {
      // Add loading state
      transformBtn.classList.add('loading');
      
      setTimeout(() => {
        if (isShowingOriginal) {
          // Switch to processed images
          imageSet1.classList.remove('active');
          imageSet1.classList.add('exit');
          
          setTimeout(() => {
            imageSet2.classList.add('active');
            btnText.textContent = 'Show Original Images';
            demoDescription.textContent = 'Notice how sWTA processing creates more visually similar representations across different domains';
            isShowingOriginal = false;
            imageSet1.classList.remove('exit');
          }, 300);
          
        } else {
          // Switch back to original images
          imageSet2.classList.remove('active');
          imageSet2.classList.add('exit');
          
          setTimeout(() => {
            imageSet1.classList.add('active');
            btnText.textContent = 'Show ViT Patches';
            demoDescription.textContent = 'Click to see how sWTA processing creates more uniform representations across different domains';
            isShowingOriginal = true;
            imageSet2.classList.remove('exit');
          }, 300);
        }
        
        // Remove loading state
        transformBtn.classList.remove('loading');
      }, 500);
    });
  }

  // File upload handling
  function handleFileUpload(file) {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = function(e) {
        preview.src = e.target.result;
        
        // Update upload zone text
        uploadText.textContent = 'Image uploaded successfully!';
        uploadSubtext.textContent = 'Click to upload a different image';
        
        // Add success styling
        uploadZone.style.borderColor = '#0F1923';
        uploadZone.style.backgroundColor = 'rgba(15, 25, 35, 0.1)';
        
        // Reset styling after a moment
        setTimeout(() => {
          uploadText.textContent = 'Click to upload an image or drag and drop';
          uploadSubtext.textContent = 'Supports JPG, PNG, and GIF files';
          uploadZone.style.borderColor = '#4A5568';
          uploadZone.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
        }, 2000);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a valid image file (JPG, PNG, or GIF)');
    }
  }

  // File input change event
  if (imageUpload) {
    imageUpload.addEventListener('change', function(event) {
      const file = event.target.files[0];
      handleFileUpload(file);
    });
  }

  // Drag and drop functionality
  if (uploadZone) {
    uploadZone.addEventListener('dragover', function(e) {
      e.preventDefault();
      uploadZone.classList.add('dragover');
    });

    uploadZone.addEventListener('dragleave', function(e) {
      e.preventDefault();
      uploadZone.classList.remove('dragover');
    });

    uploadZone.addEventListener('drop', function(e) {
      e.preventDefault();
      uploadZone.classList.remove('dragover');
      
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleFileUpload(files[0]);
      }
    });

    // Click to upload
    uploadZone.addEventListener('click', function() {
      imageUpload.click();
    });
  }

  // Smooth scrolling for demo link
  const demoLinks = document.querySelectorAll('a[href="#demo"]');
  demoLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      document.getElementById('demo').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    });
  });

  // Contact form smooth scrolling
  const contactLinks = document.querySelectorAll('a[href="#contact"]');
  contactLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    });
  });
});
