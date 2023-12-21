// CODED BY UMUTSAR (FOR CALCULUS PROJECT) - github.com/umutsar (MIT LICENCE)
// CONTACT@UMUTSAR.COM
// .MATH111 CALCULUS PROJECT, Lecturer: Assoc. Prof. Dr. Ece Yetkin Celikel


const vector = document.getElementById('vector');
const vector3 = document.getElementById('vector3');
const vectorSu = document.getElementById('vectorSu');
const aci2 = document.getElementById('aci2');
const guncelUzunlukValue = document.getElementById('guncelUzunlukValue');
const anlikAlan = document.getElementById('anlikAlan');
const anlikAlanValue = document.getElementById('anlikAlanValue');
const maximumAlanaUlasildi = document.getElementById('maximumAlanaUlasildi');
const suYuksekligiValue = document.getElementById('suYuksekligiValue');
const kenarlar = document.getElementById('kenarlar');
const vector2yazi = document.getElementById('vector2yazi');
const tabanAyarlaButon = document.getElementById('tabanAyarlaButon')
const taban = document.getElementById('taban');

let kök, kök1, kök2, tureveGoreAlan, tabanValue;


// Fonksiyonlar

document.addEventListener('DOMContentLoaded', () => {
    makeDraggable('vector', 1);
});


function sin(dereceSin) {
    let radyanSin = (parseInt(dereceSin) * Math.PI) / 180;
    return Math.sin(radyanSin);
}

function cos(dereceCos) {
    let radyanCos = (parseInt(dereceCos) * Math.PI) / 180;
    return Math.cos(radyanCos);
}

// Taban uzunluğu ve kenarların birinin uzunluğu ile maximum kesit alanı bulma fonkisyonu.
function turevHesapla(kenar) {
    tabanValue = parseInt(vector2yazi.innerText);
    kök1 = -(tabanValue + Math.sqrt((tabanValue ** 2) + 8 * (kenar ** 2))) / 4
    kök2 = -(tabanValue - Math.sqrt((tabanValue ** 2) + 8 * (kenar ** 2))) / 4
    if (kök1 <= kök2) {
        kök = kök2;
    }
    else {
        kök = kök1;
    }

    tureveGoreAlan = parseInt((tabanValue + kök) * (Math.sqrt(kenar ** 2 - kök ** 2)));
}


function makeDraggable() {
    let isDragging = false;

    varsayilanPozisyonaAyarla();

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

            updateAngle(degrees.toFixed(2));
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
}

function varsayilanPozisyonaAyarla() {
    let defaultAngle = -145;

    vector.style.transform = `rotate(${defaultAngle}deg)`;
    vector3.style.transform = `rotate(${180 - defaultAngle}deg)`;
}

let anlikSuYuksekligi;
function updateAngle(angle) {
    let aci = document.getElementById("aci1");
    if (angle) {
        let parsedAngle = parseInt(angle);

        if (parsedAngle < 0) {
            aci.innerHTML = `${-parsedAngle}<span class="dereceIsareti">°</span>`;
            aci2.innerHTML = `${180 + parsedAngle}<span class="dereceIsareti">°</span>`;

            vector.innerHTML = `${-parsedAngle}<span class="dereceIsareti">°</span>`;
            vector3.innerHTML = `${180 + parsedAngle}<span class="dereceIsareti">°</span>`;
        } else {
            aci.innerHTML = `${360 - parsedAngle}<span class="dereceIsareti">°</span>`;
            aci2.innerHTML = `${180 + parsedAngle}<span class="dereceIsareti">°</span>`;

            vector.innerHTML = `${360 - parsedAngle}<span class="dereceIsareti">°</span>`;
            vector3.innerHTML = `${180 + parsedAngle}<span class="dereceIsareti">°</span>`;
        }



        turevHesapla(parseInt(kenarUzunlugu))

        let alan = (parseInt(kenarUzunlugu) * sin(180 + parsedAngle) * tabanValue) +
            (parseInt(kenarUzunlugu) ** 2 * sin(180 + parsedAngle) * cos(180 + parsedAngle));

        console.log(parsedAngle)
        anlikAlanValue.innerText = `${alan}`;

        if (Math.abs(alan - tureveGoreAlan) < 50) {
            maximumAlanaUlasildi.style.display = 'block'
        }
        else {
            maximumAlanaUlasildi.style.display = 'none'
        }
        anlikSuYuksekligi = `${parseInt(kenarUzunlugu) * sin(180 + parsedAngle)}`
        suYuksekligiValue.innerText = anlikSuYuksekligi;
        console.log(alan, Math.abs(alan - tureveGoreAlan), tureveGoreAlan)
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


                // console.log(yFixed)
            }
        }

        document.addEventListener('mouseup', () => {
            isDragging = false;
            document.removeEventListener('mousemove', handleMouseMove);
        });
    });
}


// Uzunluk ayarlama yerleri
let kenarUzunlugu = "360";

document.getElementById('kenarlarButon').addEventListener('click', function (event) {
    event.preventDefault();
    maximumAlanaUlasildi.style.display = 'none'
    kenarUzunlugu = kenarlar.value;
    guncelUzunlukValue.innerText = kenarUzunlugu

    if (parseInt(kenarUzunlugu) > 500) {
        kenarUzunlugu = '500';
        alert("uzunluk en fazla 500 birim olabilir. ")
        guncelUzunlukValue.innerText = "500";
    }

    if (parseInt(kenarUzunlugu) < 0) {
        kenarUzunlugu = '0';
    }
    vector.style.width = kenarUzunlugu + 'px';
    vector3.style.width = kenarUzunlugu + 'px';

    // vectorSu.style.width = `${kenarUzunlugu * 2 + 600}px`;
    // vectorSu.style.left = `calc(50% - ${(kenarUzunlugu * 2 + 600) / 2}px)`;

    kenarlar.value = ""
});


tabanAyarlaButon.addEventListener('click', function (event) {
    event.preventDefault();
    maximumAlanaUlasildi.style.display = 'none'
    vector2yazi.innerText = `${taban.value}`
    tabanValue = parseInt(`${taban.value}`);

    console.log(tabanValue)
});

// H = Hipotenüs x Sinüs
