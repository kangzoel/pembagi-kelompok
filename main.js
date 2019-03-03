var bagi = {
    orang: (jumlah_orang, jumlah_orang_per_kelompok, distribusi) => {
        var orangs = [],
            kelompoks = [];

        console.log(distribusi);


        for (let i = 0; i < jumlah_orang; i++) {
            orangs.push(i + 1);
        }

        var n_kelompoks = Math.ceil(jumlah_orang / jumlah_orang_per_kelompok);

        if (distribusi) {
            for (let i = 0; i < n_kelompoks; i++) {
                for (let j = 0; j < jumlah_orang_per_kelompok; j++) {
                    var pindah = Math.floor(Math.random() * orangs.length);

                    if (typeof kelompoks[i] == 'undefined' &&
                        orangs.length >= jumlah_orang_per_kelompok
                    ) {
                        kelompoks[i] = [];
                    }

                    if (typeof orangs[pindah] != 'undefined') {
                        if (typeof kelompoks[i] != 'undefined' &&
                            orangs.length + kelompoks[i].length >= jumlah_orang_per_kelompok
                        ) {
                            kelompoks[i].push(orangs[pindah]);
                            orangs.splice(pindah, 1);
                        } else {
                            // distribusikan sisanya ke kelompok lain
                            kelompoks[i - kelompoks.length + j].push(orangs[pindah]);
                            orangs.splice(pindah, 1);
                        }
                    }
                }
            }
        } else {
            for (let i = 0; i < n_kelompoks; i++) {
                for (let j = 0; j < jumlah_orang_per_kelompok; j++) {
                    var pindah = Math.floor(Math.random() * orangs.length);

                    if (typeof kelompoks[i] == 'undefined') {
                        kelompoks[i] = [];
                    }

                    if (typeof orangs[pindah] != 'undefined') {
                        kelompoks[i].push(orangs[pindah]);
                        orangs.splice(pindah, 1);
                    }
                }
            }
        }

        return kelompoks;
    },
    kelompok: (jumlah_orang, jumlah_kelompok) => {
        var orangs = [],
            kelompoks = [];

        for (let i = 0; i < jumlah_orang; i++) {
            orangs.push(i + 1);
        }

        for (let i = 0; i < jumlah_orang; i++) {
            for (let j = 0; j < jumlah_kelompok; j++) {
                var pindah = Math.floor(Math.random() * orangs.length);

                if (typeof kelompoks[j] == 'undefined') {
                    kelompoks[j] = [];
                }

                if (typeof orangs[pindah] != 'undefined') {
                    kelompoks[j].push(orangs[pindah]);
                    orangs.splice(pindah, 1);
                }
            }
        }

        return kelompoks;
    },
    print: (kelompoks, element) => {
        html = ' <h2>Hasil:</h2>';
        html += '<ul>';

        for (let i = 0; i < kelompoks.length; i++) {
            const el = kelompoks[i];

            html += '<li>';
            html += '   <b>Kelompok ' + (i + 1) + '</b> - (' + el.length + ' orang)';
            html += '<ul>'

            for (let j = 0; j < el.length; j++) {
                const li_el = el[j];

                html += '<li>' + li_el + '</li>';
            }

            html += '</ul>';
        }

        element.innerHTML = html;

        return true;
    }
}

var _jumlah_orang = document.getElementsByName('jumlah_orang')[0],
    _jumlah_kelompok = document.getElementsByName('jumlah_kelompok')[0],
    _jumlah_orang_per_kelompok = document.getElementsByName('jumlah_orang_per_kelompok')[0],
    _base = document.getElementsByClassName('base'),
    _input = document.querySelectorAll('input[type="number"]'),
    _hasil = document.getElementById('hasil'),
    _distribusi = document.getElementById('distribusi'),
    _distribusi_radio = document.querySelectorAll('#distribusi label'),
    distribusi,
    hitung;

for (let i = 0; i < _base.length; i++) {
    const el = _base[i];

    el.addEventListener('click', () => {
        _hasil.classList.remove('block');
        _hasil.innerHTML = '';

        if (el.children[0].value == 'kelompok') {
            _distribusi.style.display = 'none';

            hitung = 'kelompok';
            document.getElementById('kelompok').style.display = 'block';
            document.getElementById('orang_per_kelompok').style.display = 'none';
        } else {
            hitung = 'orang_per_kelompok';
            document.getElementById('orang_per_kelompok').style.display = 'block';
            document.getElementById('kelompok').style.display = 'none';
        }
    })
}

for (let i = 0; i < _input.length; i++) {
    const el = _input[i];

    el.addEventListener('keyup', () => {
        if (_jumlah_orang.value) {
            if (hitung == 'kelompok') {
                _hasil.classList.add('block');

                if (_jumlah_kelompok.value) {
                    bagi.print(
                        bagi.kelompok(_jumlah_orang.value, _jumlah_kelompok.value),
                        _hasil
                    );
                }
            } else if (hitung == 'orang_per_kelompok') {
                _hasil.classList.add('block');

                if (_jumlah_orang_per_kelompok.value) {
                    _distribusi.style.display = 'block';
                    document.getElementsByClassName('n')[0].innerHTML = _jumlah_orang_per_kelompok.value;

                    if (distribusi) {
                        bagi.print(
                            bagi.orang(_jumlah_orang.value, _jumlah_orang_per_kelompok.value, true),
                            _hasil
                        );
                    } else if (distribusi === 0) {
                        bagi.print(
                            bagi.orang(_jumlah_orang.value, _jumlah_orang_per_kelompok.value, false),
                            _hasil
                        );
                    }
                }
            }
        }
    })
}

for (let i = 0; i < _distribusi_radio.length; i++) {
    const el = _distribusi_radio[i];

    el.addEventListener('click', () => {
        var val = el.children[0].value;

        if (val == 1) {
            distribusi = 1;

            bagi.print(
                bagi.orang(_jumlah_orang.value, _jumlah_orang_per_kelompok.value, true),
                _hasil
            );
        } else if (val == 0) {
            distribusi = 0;

            bagi.print(
                bagi.orang(_jumlah_orang.value, _jumlah_orang_per_kelompok.value, false),
                _hasil
            );
        }

        console.log(el);

    })
}
