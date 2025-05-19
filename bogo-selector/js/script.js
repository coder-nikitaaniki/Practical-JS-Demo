document.addEventListener('DOMContentLoaded', () => {
    const optionBoxes = document.querySelectorAll('.option-box');
    const radioInputs = document.querySelectorAll('input[type="radio"]');
    const totalAmount = document.querySelector('.total-amount');
    
    const updateTotal = (price) => {
        totalAmount.textContent = price;
    };

    const handleOptionSelect = (box) => {
        const currentActive = document.querySelector('.option-box.active');
        
        optionBoxes.forEach(b => {
            if (b !== box) {
                b.classList.remove('active');
            }
        });
        
        box.classList.add('active');
        
        const radio = box.querySelector('input[type="radio"]');
        radio.checked = true;
        
        const price = box.querySelector('.price').textContent;
        updateTotal(price);
    };

    optionBoxes.forEach(box => {
        box.addEventListener('click', () => handleOptionSelect(box));
    });

    radioInputs.forEach(radio => {
        radio.addEventListener('change', () => {
            const box = radio.closest('.option-box');
            handleOptionSelect(box);
        });
    });

    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
        select.addEventListener('change', (e) => {
            e.stopPropagation();
        });
    });

    const addToCartBtn = document.querySelector('.add-to-cart');
    addToCartBtn.addEventListener('click', () => {
        const selectedOption = document.querySelector('.option-box.active');
        const units = selectedOption.dataset.units;
        const selections = [];

        if (units > 1) {
            const items = selectedOption.querySelectorAll('.item');
            items.forEach(item => {
                const size = item.querySelector('.size-select').value;
                const color = item.querySelector('.color-select').value;
                selections.push({ size, color });
            });
        }

        console.log('Adding to cart:', {
            units,
            selections,
            price: totalAmount.textContent
        });
    });
});
