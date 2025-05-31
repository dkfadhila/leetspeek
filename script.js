document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const konversiButton = document.getElementById('konversiButton');
    const gayaKompleksCheckbox = document.getElementById('gayaKompleks');

    // Peta substitusi Leetspeak (mirip dengan contoh Python)
    // Kamu bisa membuat ini lebih kompleks atau sederhana sesuai keinginan
    const petaLeetDasar = {
        'a': ['4', '@'], 'b': ['8'], 'c': ['('], 'd': [')', '|)'], 'e': ['3'],
        'f': ['|=', 'ph'], 'g': ['9', '6', '&'], 'h': ['#', '|-|'], 'i': ['1', '!', '|'],
        'j': ['_|'], 'k': ['|<', '|('], 'l': ['1', '|_'], 'm': ['/\\/\\', '|\\/|'],
        'n': ['/\\/', '|\\|'], 'o': ['0', '()'], 'p': ['|D', '|*'], 'q': ['(,)'],
        'r': ['|2', 'Я'], 's': ['5', '$', 'z'], 't': ['7', '+'], 'u': ['|_|', 'v'],
        'v': ['\\/'], 'w': ['\\/\\/', 'vv'], 'x': ['><', '}{'], 'y': ['`/'], 'z': ['2', '%']
    };

    const petaLeetKompleks = {
        // Kata spesifik (prioritas lebih tinggi)
        'malam': ['121/\\/D', 'M4L4M'],
        'ini': ['!_!', '1N1'],
        'aku': ['@q1-1u', '4k!_', '4ku'],
        'sangat': ['54/\/947', 'S4NG4T'],
        'rindu': ['121/\/du', 'R1NDU'],
        'kalian': ['k4111!_!', 'K4L14N'],
        'terasa': ['7312454'],
        'saja': ['5@j4'],
        'masih': ['1114$1'],
        'ada': ['4d4'],
        'disisiku': ['d15151k!_!'],
        'tak': ['74k'],
        'mudah': ['111!_!d4', 'MUD4H'],
        'melupakan': ['1113L!_!p4ka/\/'],
        'dirimu': ['d!12i111!_!'],
        'disaat': ['d15447'],
        'terbangun': ['731284ng4!_/\\/'],
        'dari': ['d412i'],
        'tidurku': ['71d!_!12k!_!'],
        // Karakter individual yang sering muncul di contoh kompleks
        // Ini bisa tumpang tindih dengan petaLeetDasar, atau jadi pilihan tambahan
        'a': ['4', '@', 'A'],
        'i': ['1', '!_!', '111', 'i'], // jaga 'i' agar bisa tetap jadi 'i' jika perlu
        'u': ['!_!', 'U', '|_|'],
        'e': ['3', 'E'],
        's': ['5', '$', 'S'],
        'k': ['k', 'K', 'k4'],
        'd': ['d', 'D', 'd1']
    };

    function getRandomChoice(arr) {
        if (!arr || arr.length === 0) return '';
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function keLeetSpeak(teks, gayaKompleks) {
        let hasilLeet = "";
        const kataKata = teks.toLowerCase().split(/(\s+)/); // Pisah kata tapi pertahankan spasi

        if (gayaKompleks) {
            for (const bagian of kataKata) {
                if (bagian.trim() === '') { // Jika ini spasi
                    hasilLeet += bagian;
                    continue;
                }
                const kata = bagian.trim();
                if (petaLeetKompleks[kata]) { // Cek kata utuh di peta kompleks
                    hasilLeet += getRandomChoice(petaLeetKompleks[kata]);
                } else {
                    // Jika kata tidak ada, konversi per karakter menggunakan peta kompleks & dasar
                    let kataSementara = "";
                    for (const char of kata) {
                        if (petaLeetKompleks[char]) {
                            kataSementara += getRandomChoice(petaLeetKompleks[char]);
                        } else if (petaLeetDasar[char]) {
                            kataSementara += getRandomChoice(petaLeetDasar[char]);
                        } else {
                            kataSementara += char;
                        }
                    }
                    hasilLeet += kataSementara;
                }
            }
        } else { // Gaya dasar per karakter
            for (const char of teks.toLowerCase()) {
                if (petaLeetDasar[char]) {
                    hasilLeet += getRandomChoice(petaLeetDasar[char]);
                } else {
                    hasilLeet += char;
                }
            }
        }
        return hasilLeet;
    }

    konversiButton.addEventListener('click', () => {
        const teksAsli = inputText.value;
        const gunakanGayaKompleks = gayaKompleksCheckbox.checked;
        const teksLeet = keLeetSpeak(teksAsli, gunakanGayaKompleks);
        outputText.value = teksLeet;
    });
});