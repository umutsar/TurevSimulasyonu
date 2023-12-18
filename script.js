document.addEventListener('DOMContentLoaded', () => {
    makeDraggable('vector', 1);
    // makeDraggable('vector3', 2);
    suCizgisi('vectorSu');
});

const vector = document.getElementById('vector');
const vector3 = document.getElementById('vector3');
const vectorSu = document.getElementById('vectorSu');
const aci2 = document.getElementById('aci2');
const guncelUzunlukValue = document.getElementById('guncelUzunlukValue');
const anlikAlan = document.getElementById('anlikAlan');
const anlikAlanValue = document.getElementById('anlikAlanValue')
const maximumAlanaUlasildi = document.getElementById('maximumAlanaUlasildi')
const suYuksekligiValue = document.getElementById('suYuksekligiValue')

function makeDraggable(id, elementId) {
    const vector = document.getElementById(id);
    let isDragging = false;

    setDefaultPosition(id, elementId);

    vector.addEventListener('mousedown', (e) => {
        isDragging = true;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const containerRect = vector.parentElement.getBoundingClientRect();
            const containerCenterX = containerRect.left + containerRect.width / 2;
            const containerCenterY = containerRect.top + containerRect.height / 2;

            const angle = Math.atan2(e.clientY - containerCenterY, e.clientX - containerCenterX);
            const degrees = angle * (180 / Math.PI);
            vector.style.transform = `rotate(${degrees}deg)`;
            vector3.style.transform = `rotate(${180 - degrees}deg)`;

            updateAngle(elementId, degrees.toFixed(2));
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
}

function setDefaultPosition(id, elementId) {
    let defaultAngle = -145;

    document.getElementById(id).style.transform = `rotate(${defaultAngle}deg)`;
    vector3.style.transform = `rotate(${180 - defaultAngle}deg)`;
}

function updateAngle(elementId, angle) {
    let aci = document.getElementById(`aci${elementId}`);
    if (angle) {
        let parsedAngle = parseInt(angle);
        let kenarlar = parseInt(guncelUzunlukValue.innerText);

        if (parsedAngle < 0) {
            aci.innerText = `${-parsedAngle}`;
            aci2.innerText = `${180 + parsedAngle}`;
        } else {
            aci.innerText = `${360 - parsedAngle}`;
            aci2.innerText = `${180 + parsedAngle}`;
        }
        if(parseInt(aci2.innerText) == 45) {
            maximumAlanaUlasildi.style.display = 'block'
        }
        else {
            maximumAlanaUlasildi.style.display = 'none'
        }

        // Açıları radian cinsine çevir
        let radianAngle = (parsedAngle * Math.PI) / 180;
        let alan = (kenarlar * kenarlar * Math.sin(radianAngle) * Math.cos(radianAngle)).toFixed(2);

        anlikAlanValue.innerText = `${alan}`;
    }
}

// Su Çizgisi Ayarları

function suCizgisi(id) {
    const vector = document.getElementById(id);
    const container = vector.parentElement;
    let isDragging = false;

    vector.addEventListener('mousedown', (e) => {
        isDragging = true;
        const offsetX = e.clientX - vector.getBoundingClientRect().left;
        const offsetY = e.clientY - vector.getBoundingClientRect().top;

        document.addEventListener('mousemove', handleMouseMove);

        function handleMouseMove(e) {
            if (isDragging) {
                const x = e.clientX - offsetX - container.getBoundingClientRect().left;
                const y = e.clientY - offsetY - container.getBoundingClientRect().top;
                let yFixed = y;
                if (y < 0) {
                    vector.style.top = `0`;
                    yFixed = 0;
                }
                else if (y > 350) {
                    vector.style.top = `350px`;
                    yFixed = 350;
                }
                else {
                    vector.style.top = `${y}px`;
                    yFixed = y;
                }


                console.log(yFixed)
            }
        }

        document.addEventListener('mouseup', () => {
            isDragging = false;
            document.removeEventListener('mousemove', handleMouseMove);
        });
    });
}


// Uzunluk ayarlama yerleri


document.getElementById('kenarlarButon').addEventListener('click', function (event) {
    event.preventDefault();
    let kenarlar = document.getElementById('kenarlar');
    let kenarUzunlugu = kenarlar.value;
    guncelUzunlukValue.innerText = kenarUzunlugu
    if(parseInt(kenarUzunlugu) > 500) {
        kenarUzunlugu = '500';
        alert("uzunluk en fazla 500 birim olabilir. ")
    }

    if(parseInt(kenarUzunlugu) < 0) {
        kenarUzunlugu = '0';
    }
    vector.style.width = kenarUzunlugu + 'px';
    vector3.style.width = kenarUzunlugu + 'px';
    vectorSu.style.width = `${kenarUzunlugu*2 + 600}px`;
    vectorSu.style.left = `calc(50% - ${(kenarUzunlugu*2 + 600) / 2}px)`;

    kenarlar.value = ""
});

// H = Hipotenüs x Sinüs
